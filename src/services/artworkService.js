import { getApperClient } from './apperClient';

const artworkService = {
  // Fetch all artworks with optional filtering and pagination
  fetchArtworks: async (filters = {}, page = 1, pageSize = 10) => {
    try {
      const apperClient = getApperClient();
      
      // Prepare query parameters
      const params = {
        fields: [
          "Id", "Name", "title", "artist", "image", "description", 
          "price", "medium", "dimensions", "year", "category"
        ],
        pagingInfo: {
          limit: pageSize,
          offset: (page - 1) * pageSize
        },
        orderBy: [{ field: "CreatedOn", direction: "desc" }]
      };
      
      // Add filters if provided
      if (Object.keys(filters).length > 0) {
        params.filters = Object.entries(filters).map(([field, value]) => ({
          field,
          operator: "eq",
          value
        }));
      }
      
      const response = await apperClient.fetchRecords("artwork", params);
      return response.data;
    } catch (error) {
      console.error("Error fetching artworks:", error);
      throw error;
    }
  },
  
  // Fetch a single artwork by ID
  fetchArtworkById: async (id) => {
    try {
      const apperClient = getApperClient();
      
      const params = {
        fields: [
          "Id", "Name", "title", "artist", "image", "description", 
          "price", "medium", "dimensions", "year", "category"
        ],
        filters: [
          {
            field: "Id",
            operator: "eq",
            value: id
          }
        ]
      };
      
      const response = await apperClient.fetchRecords("artwork", params);
      return response.data.length > 0 ? response.data[0] : null;
    } catch (error) {
      console.error(`Error fetching artwork with ID ${id}:`, error);
      throw error;
    }
  },
  
  // Create a new artwork
  createArtwork: async (artworkData) => {
    try {
      const apperClient = getApperClient();
      
      const params = {
        record: {
          Name: artworkData.title, // Use title as Name for display
          title: artworkData.title,
          artist: artworkData.artist,
          image: artworkData.image,
          description: artworkData.description,
          price: artworkData.price,
          medium: artworkData.medium,
          dimensions: artworkData.dimensions,
          year: artworkData.year,
          category: artworkData.category
        }
      };
      
      const response = await apperClient.createRecord("artwork", params);
      return response.data;
    } catch (error) {
      console.error("Error creating artwork:", error);
      throw error;
    }
  },
  
  // Update an existing artwork
  updateArtwork: async (id, artworkData) => {
    try {
      const apperClient = getApperClient();
      
      const params = {
        record: {
          Name: artworkData.title, // Update Name field to match title
          ...artworkData
        }
      };
      
      const response = await apperClient.updateRecord("artwork", id, params);
      return response.data;
    } catch (error) {
      console.error(`Error updating artwork with ID ${id}:`, error);
      throw error;
    }
  },
  
  // Delete an artwork
  deleteArtwork: async (id) => {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.deleteRecord("artwork", id);
      return response.data;
    } catch (error) {
      console.error(`Error deleting artwork with ID ${id}:`, error);
      throw error;
    }
  }
};

export default artworkService;