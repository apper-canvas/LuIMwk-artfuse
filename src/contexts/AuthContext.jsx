import { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Initialize auth state on component mount
  useEffect(() => {
    const initAuth = () => {
      const currentUser = authService.getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };
    
    initAuth();
  }, []);
  
  // Login function
  const login = async (targetElement) => {
    return new Promise((resolve) => {
      authService.setupAuthUI(
        targetElement, 
        'login',
        (user) => {
          setUser(user.data);
          resolve({ success: true, user: user.data });
        },
        (error) => {
          resolve({ success: false, error });
        }
      );
      
      authService.showLogin(targetElement);
    });
  };
  
  // Signup function
  const signup = async (targetElement) => {
    return new Promise((resolve) => {
      authService.setupAuthUI(
        targetElement,
        'signup',
        (user) => {
          setUser(user.data);
          resolve({ success: true, user: user.data });
        },
        (error) => {
          resolve({ success: false, error });
        }
      );
      
      authService.showSignup(targetElement);
    });
  };
  
  // Logout function
  const logout = () => {
    authService.logout();
    setUser(null);
    return true;
  };
  
  // Create the context value
  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    signup,
    logout
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};