// Central configuration for the Apper client
const CANVAS_ID = "71fe2fb0dccf47a38d9a09c52acd3fc6";

// Create a singleton instance of the ApperClient
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient(CANVAS_ID);
};

// Export the ApperClient instance and CANVAS_ID for use across the application
export { getApperClient, CANVAS_ID };