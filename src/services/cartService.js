import { getApperClient } from './apperClient';
import authService from './authService';

const cartService = {
  // Fetch cart items for the current user
  fetchCartItems: async () => {
    try {
      const apperClient = getApperClient();
      const currentUser = authService.getCurrentUser();
      
      if (!currentUser) {
        throw new Error("User not authenticated");
      }
      
      const params = {
        fields: [
          "Id", "Name", "quantity", "price", "added_date", 
          "artwork_id", "customization_id"
        ],
        filters: [
          {
            field: "Owner",
            operator: "eq",
            value: currentUser.userId
          }
        ],
        orderBy: [{ field: "added_date", direction: "desc" }]
      };
      
      const response = await apperClient.fetchRecords("cart_item", params);
      
      // Fetch additional details for each cart item
      const cartItems = response.data;
      
      // If we need to fetch artwork details for each cart item, we'd do it here
      // This would require additional fetchRecords calls for each artwork_id
      
      return cartItems;
    } catch (error) {
      console.error("Error fetching cart items:", error);
      throw error;
    }
  },
  
  // Add an item to the cart
  addToCart: async (artworkId, customizationId, quantity = 1, price) => {
    try {
      const apperClient = getApperClient();
      const currentUser = authService.getCurrentUser();
      
      if (!currentUser) {
        throw new Error("User not authenticated");
      }
      
      // Check if the item is already in the cart
      const existingItems = await cartService.fetchCartItems();
      const existingItem = existingItems.find(item => 
        item.artwork_id === artworkId && 
        item.customization_id === customizationId
      );
      
      if (existingItem) {
        // Update the quantity if the item already exists
        return await cartService.updateCartItemQuantity(
          existingItem.Id, 
          existingItem.quantity + quantity
        );
      }
      
      // Create a new cart item
      const params = {
        record: {
          Name: `Cart item - ${new Date().toISOString()}`,
          quantity: quantity,
          price: price,
          added_date: new Date().toISOString(),
          artwork_id: artworkId,
          customization_id: customizationId
        }
      };
      
      const response = await apperClient.createRecord("cart_item", params);
      return response.data;
    } catch (error) {
      console.error("Error adding item to cart:", error);
      throw error;
    }
  },
  
  // Update cart item quantity
  updateCartItemQuantity: async (cartItemId, newQuantity) => {
    try {
      const apperClient = getApperClient();
      
      const params = {
        record: {
          quantity: newQuantity
        }
      };
      
      const response = await apperClient.updateRecord("cart_item", cartItemId, params);
      return response.data;
    } catch (error) {
      console.error(`Error updating quantity for cart item ${cartItemId}:`, error);
      throw error;
    }
  },
  
  // Remove an item from the cart
  removeFromCart: async (cartItemId) => {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.deleteRecord("cart_item", cartItemId);
      return response.data;
    } catch (error) {
      console.error(`Error removing cart item ${cartItemId}:`, error);
      throw error;
    }
  },
  
  // Clear the entire cart
  clearCart: async () => {
    try {
      const cartItems = await cartService.fetchCartItems();
      
      // Delete each cart item
      const deletePromises = cartItems.map(item => 
        cartService.removeFromCart(item.Id)
      );
      
      await Promise.all(deletePromises);
      return { success: true };
    } catch (error) {
      console.error("Error clearing cart:", error);
      throw error;
    }
  }
};

export default cartService;