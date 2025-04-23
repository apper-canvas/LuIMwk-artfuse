import { getApperClient } from './apperClient';
import authService from './authService';

const savedArtworkService = {
  // Fetch saved artworks for the current user
  fetchSavedArtworks: async () => {
    try {
      const apperClient = getApperClient();
      const currentUser = authService.getCurrentUser();
      
      if (!currentUser) {
        throw new Error("User not authenticated");
      }
      
      const params = {
        fields: [
          "Id", "Name", "user_id", "artwork_id", "saved_date"
        ],
        filters: [
          {
            field: "user_id",
            operator: "eq",
            value: currentUser.userId
          }
        ],
        orderBy: [{ field: "saved_date", direction: "desc" }]
      };
      
      const response = await apperClient.fetchRecords("user_saved_artwork", params);
      return response.data;
    } catch (error) {
      console.error("Error fetching saved artworks:", error);
      throw error;
    }
  },
  
  // Check if an artwork is saved by the current user
  isArtworkSaved: async (artworkId) => {
    try {
      const apperClient = getApperClient();
      const currentUser = authService.getCurrentUser();
      
      if (!currentUser) {
        return false;
      }
      
      const params = {
        fields: ["Id"],
        filters: [
          {
            field: "user_id",
            operator: "eq",
            value: currentUser.userId
          },
          {
            field: "artwork_id",
            operator: "eq",
            value: artworkId
          }
        ]
      };
      
      const response = await apperClient.fetchRecords("user_saved_artwork", params);
      return response.data.length > 0;
    } catch (error) {
      console.error(`Error checking if artwork ${artworkId} is saved:`, error);
      return false;
    }
  },
  
  // Save an artwork
  saveArtwork: async (artworkId) => {
    try {
      const apperClient = getApperClient();
      const currentUser = authService.getCurrentUser();
      
      if (!currentUser) {
        throw new Error("User not authenticated");
      }
      
      // Check if already saved
      const isSaved = await savedArtworkService.isArtworkSaved(artworkId);
      if (isSaved) {
        return { alreadySaved: true };
      }
      
      const params = {
        record: {
          Name: `Saved Artwork - ${artworkId}`,
          user_id: currentUser.userId,
          artwork_id: artworkId,
          saved_date: new Date().toISOString()
        }
      };
      
      const response = await apperClient.createRecord("user_saved_artwork", params);
      return response.data;
    } catch (error) {
      console.error(`Error saving artwork ${artworkId}:`, error);
      throw error;
    }
  },
  
  // Unsave an artwork
  unsaveArtwork: async (artworkId) => {
    try {
      const apperClient = getApperClient();
      const currentUser = authService.getCurrentUser();
      
      if (!currentUser) {
        throw new Error("User not authenticated");
      }
      
      // Find the saved artwork record
      const params = {
        fields: ["Id"],
        filters: [
          {
            field: "user_id",
            operator: "eq",
            value: currentUser.userId
          },
          {
            field: "artwork_id",
            operator: "eq",
            value: artworkId
          }
        ]
      };
      
      const response = await apperClient.fetchRecords("user_saved_artwork", params);
      
      if (response.data.length === 0) {
        return { notSaved: true };
      }
      
      // Delete the saved artwork record
      const savedArtworkId = response.data[0].Id;
      await apperClient.deleteRecord("user_saved_artwork", savedArtworkId);
      
      return { success: true };
    } catch (error) {
      console.error(`Error unsaving artwork ${artworkId}:`, error);
      throw error;
    }
  }
};

export default savedArtworkService;