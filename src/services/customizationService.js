import { getApperClient } from './apperClient';

const customizationService = {
  // Fetch customization options for a specific artwork
  fetchCustomizationOptionsForArtwork: async (artworkId) => {
    try {
      const apperClient = getApperClient();
      
      const params = {
        fields: [
          "Id", "Name", "size", "material", "frame_style", "frame_color",
          "mat_enabled", "mat_color", "mat_width", "glass_type",
          "color_scheme", "mounting_type", "final_price", "artwork_id"
        ],
        filters: [
          {
            field: "artwork_id",
            operator: "eq",
            value: artworkId
          }
        ]
      };
      
      const response = await apperClient.fetchRecords("customization_option", params);
      return response.data;
    } catch (error) {
      console.error(`Error fetching customization options for artwork ${artworkId}:`, error);
      throw error;
    }
  },
  
  // Create a new customization option
  createCustomizationOption: async (customizationData) => {
    try {
      const apperClient = getApperClient();
      
      const params = {
        record: {
          Name: `${customizationData.size} ${customizationData.material} - ${customizationData.frame_style}`,
          ...customizationData
        }
      };
      
      const response = await apperClient.createRecord("customization_option", params);
      return response.data;
    } catch (error) {
      console.error("Error creating customization option:", error);
      throw error;
    }
  },
  
  // Update an existing customization option
  updateCustomizationOption: async (id, customizationData) => {
    try {
      const apperClient = getApperClient();
      
      // Generate a readable name based on key customization attributes
      const displayName = `${customizationData.size} ${customizationData.material} - ${customizationData.frame_style}`;
      
      const params = {
        record: {
          Name: displayName,
          ...customizationData
        }
      };
      
      const response = await apperClient.updateRecord("customization_option", id, params);
      return response.data;
    } catch (error) {
      console.error(`Error updating customization option with ID ${id}:`, error);
      throw error;
    }
  },
  
  // Delete a customization option
  deleteCustomizationOption: async (id) => {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.deleteRecord("customization_option", id);
      return response.data;
    } catch (error) {
      console.error(`Error deleting customization option with ID ${id}:`, error);
      throw error;
    }
  },
  
  // Calculate final price based on customization options
  calculatePrice: (basePrice, customizationOptions) => {
    let finalPrice = basePrice;
    
    // Size multiplier
    const sizeMultipliers = {
      small: 0.8,
      medium: 1,
      large: 1.5,
      xlarge: 2.2
    };
    
    // Material multiplier
    const materialMultipliers = {
      canvas: 1,
      paper: 0.8,
      metal: 1.4,
      acrylic: 1.6
    };
    
    // Frame price additions
    const frameAdditions = {
      classic: 50,
      modern: 60,
      ornate: 75,
      floating: 65,
      noFrame: 0
    };
    
    // Apply size multiplier
    if (customizationOptions.size && sizeMultipliers[customizationOptions.size]) {
      finalPrice *= sizeMultipliers[customizationOptions.size];
    }
    
    // Apply material multiplier
    if (customizationOptions.material && materialMultipliers[customizationOptions.material]) {
      finalPrice *= materialMultipliers[customizationOptions.material];
    }
    
    // Add frame cost
    if (customizationOptions.frame_style && frameAdditions[customizationOptions.frame_style]) {
      finalPrice += frameAdditions[customizationOptions.frame_style];
    }
    
    // Add mat cost if enabled
    if (customizationOptions.mat_enabled) {
      finalPrice += 25; // Base cost for adding a mat
    }
    
    // Add glass type cost
    if (customizationOptions.glass_type) {
      const glassCosts = {
        clear: 0,
        nonGlare: 30,
        uvProtection: 45,
        museumGlass: 75
      };
      
      if (glassCosts[customizationOptions.glass_type]) {
        finalPrice += glassCosts[customizationOptions.glass_type];
      }
    }
    
    return Math.round(finalPrice * 100) / 100; // Round to 2 decimal places
  }
};

export default customizationService;