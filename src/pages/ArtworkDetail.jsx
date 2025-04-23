import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Palette } from 'lucide-react';
import artworkService from '../services/artworkService';
import savedArtworkService from '../services/savedArtworkService';
import cartService from '../services/cartService';
import customizationService from '../services/customizationService';
import { useAuth } from '../contexts/AuthContext';

export default function ArtworkDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [savingLike, setSavingLike] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchArtworkData = async () => {
      try {
        const artworkData = await artworkService.fetchArtworkById(parseInt(id));
        setArtwork(artworkData);
        
        // Check if the user has saved this artwork
        if (isAuthenticated) {
          const isSaved = await savedArtworkService.isArtworkSaved(parseInt(id));
          setLiked(isSaved);
        }
      } catch (error) {
        console.error("Error fetching artwork:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchArtworkData();
  }, [id, isAuthenticated]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleCustomize = () => {
    navigate('/customize', { state: { artwork } });
  };
  
  const handleToggleLike = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    try {
      setSavingLike(true);
      
      if (liked) {
        await savedArtworkService.unsaveArtwork(artwork.Id);
        setLiked(false);
        setSuccessMessage('Removed from saved items');
      } else {
        await savedArtworkService.saveArtwork(artwork.Id);
        setLiked(true);
        setSuccessMessage('Added to saved items');
      }
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setSavingLike(false);
    }
  };
  
  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    try {
      setAddingToCart(true);
      
      // Create a default customization option if none exists
      const customizationOptions = {
        size: 'medium',
        material: 'canvas',
        frame_style: 'classic',
        frame_color: 'black',
        mat_enabled: false,
        final_price: artwork.price
      };
      
      // Create a customization record for this artwork
      const customizationData = await customizationService.createCustomizationOption({
        ...customizationOptions,
        artwork_id: artwork.Id
      });
      
      // Add the item to the cart
      await cartService.addToCart(
        artwork.Id,
        customizationData.Id,
        1,
        artwork.price
      );
      
      setSuccessMessage('Added to cart successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold">Artwork not found</h2>
        <button 
          onClick={handleBack}
          className="mt-4 text-blue-500 flex items-center"
        >
          <ArrowLeft size={20} className="mr-2" />
          <span>Back to Gallery</span>
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={handleBack}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft size={20} className="mr-2" />
        <span>Back to Gallery</span>
      </button>
      
      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg">
          {successMessage}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img 
            src={artwork.image} 
            alt={artwork.title} 
            className="w-full h-auto object-cover"
          />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold">{artwork.title}</h1>
          <p className="text-xl text-gray-600 mt-2">by {artwork.artist}</p>
          
          <div className="flex items-center mt-4 space-x-4">
            <button 
              onClick={handleToggleLike}
              disabled={savingLike}
              className={`flex items-center space-x-1 ${liked ? 'text-red-500' : 'text-gray-500'}`}
            >
              <Heart size={20} fill={liked ? "currentColor" : "none"} />
              <span>{liked ? 'Saved' : 'Save'}</span>
            </button>
            
            <button className="flex items-center space-x-1 text-gray-500">
              <Share2 size={20} />
              <span>Share</span>
            </button>
          </div>
          
          <div className="mt-6">
            <p className="text-2xl font-bold">${artwork.price}</p>
            
            <div className="mt-4 space-y-3">
              <button 
                onClick={handleAddToCart}
                disabled={addingToCart}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
              >
                {addingToCart ? 'Adding...' : 'Add to Cart'}
              </button>
              
              <button 
                onClick={handleCustomize}
                className="w-full py-3 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition flex items-center justify-center"
              >
                <Palette size={20} className="mr-2" />
                <span>Customize Artwork</span>
              </button>
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold">About This Artwork</h2>
            <p className="mt-2 text-gray-700">{artwork.description}</p>
            
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-900">Medium</h3>
                <p className="text-gray-600">{artwork.medium}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Dimensions</h3>
                <p className="text-gray-600">{artwork.dimensions}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Year</h3>
                <p className="text-gray-600">{artwork.year}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Category</h3>
                <p className="text-gray-600">{artwork.category}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}