import { getApperClient, CANVAS_ID } from './apperClient';

// Authentication service for handling login, signup, and authentication state
const authService = {
  // Set up the authentication UI
  setupAuthUI: (targetElement, view = 'both', onSuccessCallback, onErrorCallback) => {
    const { ApperUI } = window.ApperSDK;
    const apperClient = getApperClient();
    
    ApperUI.setup(apperClient, {
      target: targetElement,
      clientId: CANVAS_ID,
      hide: [], // Nothing hidden
      view: view, // 'login', 'signup', or 'both'
      onSuccess: (user, account) => {
        // Store user info in localStorage
        localStorage.setItem('apperUser', JSON.stringify(user.data));
        
        // Call the success callback if provided
        if (onSuccessCallback) {
          onSuccessCallback(user, account);
        }
      },
      onError: (error) => {
        console.error("Authentication error:", error);
        
        // Call the error callback if provided
        if (onErrorCallback) {
          onErrorCallback(error);
        }
      }
    });
  },
  
  // Display login UI
  showLogin: (targetElement) => {
    const { ApperUI } = window.ApperSDK;
    ApperUI.showLogin(targetElement);
  },
  
  // Display signup UI
  showSignup: (targetElement) => {
    const { ApperUI } = window.ApperSDK;
    ApperUI.showSignup(targetElement);
  },
  
  // Get the current user from localStorage
  getCurrentUser: () => {
    const userStr = localStorage.getItem('apperUser');
    return userStr ? JSON.parse(userStr) : null;
  },
  
  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('apperUser');
  },
  
  // Logout the user
  logout: () => {
    localStorage.removeItem('apperUser');
    // Additional logout logic can be added here
    return true;
  }
};

export default authService;