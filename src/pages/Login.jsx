import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const authContainerRef = useRef(null);
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  // Set up authentication UI when component mounts
  useEffect(() => {
    if (authContainerRef.current && !isAuthenticated) {
      login('#authentication');
    }
  }, [login, isAuthenticated]);
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Welcome to ArtFuse</h1>
          <p className="text-gray-600 mt-2">
            Sign in to your account to access your saved artworks and cart
          </p>
        </div>
        
        {/* Authentication container */}
        <div 
          id="authentication" 
          ref={authContainerRef}
          className="min-h-[500px] flex items-center justify-center p-6 bg-white rounded-lg shadow-md"
        />
      </div>
    </div>
  );
}