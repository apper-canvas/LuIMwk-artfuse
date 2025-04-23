import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCustomization } from '../contexts/CustomizationContext';
import CustomizationPanel from '../components/customizer/CustomizationPanel';
import PreviewDisplay from '../components/customizer/PreviewDisplay';
import { ArrowLeft, ShoppingCart, Save } from 'lucide-react';
import customizationService from '../services/customizationService';
import cartService from '../services/cartService';
import { useAuth } from '../contexts/AuthContext';

export default function ArtworkCustomizer() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setInitialArtwork, artwork, options } = useCustomization();
  const { isAuthenticated } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [finalPrice, setFinalPrice] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  
  useEffect(() => {
    // Get artwork data from location state, or try to load from backend
    const loadArtworkData = async () => {
      try {
        setLoading(true);
        
        // Check if artwork data is in location state
        const artworkData = location.state?.artwork;
        
        if (artworkData) {
          setInitialArtwork(artworkData);
          setFinalPrice(artworkData.price);
        } else if (!artwork) {
          // If no artwork in state and none already loaded, redirect back
          navigate('/gallery');
          return;
        }
      } catch (error) {
        console.error("Error loading artwork:", error);
        navigate('/gallery');
      } finally {
        setLoading(false);
      }
    };
    
    loadArtworkData();
  }, [location, setInitialArtwork, navigate, artwork]);
  
  // Recalculate price when options change
  useEffect(() => {
    if (artwork) {
      // Convert the context options to format expected by the calculation service
      const calculationOptions = {
        size: options.size.scale === 75 ? 'small' :
              options.size.scale === 100 ? 'medium' :
              options.size.scale === 125 ? 'large' : 'xlarge',
        material: options.material || 'canvas',
        frame_style: options.frame.style,
        frame_color: options.frame.color,
        mat_enabled: options.mat.enabled,
        mat_color: options.mat.color,
        glass_type: options.glass.type,
        mounting_type: options.mounting.type
      };
      
      const price = customizationService.calculatePrice(artwork.price, calculationOptions);
      setFinalPrice(price);
    }
  }, [artwork, options]);

  const handleBack = () => {
    navigate(-1);
  };
  
  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (!artwork) return;
    
    try {
      setAddingToCart(true);
      
      // Convert the customization options to the format expected by the database
      const customizationData = {
        Name: `Custom ${artwork.title}`,
        size: options.size.scale === 75 ? 'small' :
              options.size.scale === 100 ? 'medium' :
              options.size.scale === 125 ? 'large' : 'xlarge',
        material: options.material || 'canvas',
        frame_style: options.frame.style,
        frame_color: options.frame.color,
        mat_enabled: options.mat.enabled,
        mat_color: options.mat.color,
        mat_width: options.mat.width,
        glass_type: options.glass.type,
        color_scheme: 'original',
        mounting_type: options.mounting.type,
        final_price: finalPrice,
        artwork_id: artwork.Id
      };
      
      // Save the customization
      const savedCustomization = await customizationService.createCustomizationOption(customizationData);
      
      // Add to cart
      await cartService.addToCart(
        artwork.Id,
        savedCustomization.Id,
        1,
        finalPrice
      );
      
      setSuccessMessage('Added to cart successfully!');
      
      // Clear the success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setAddingToCart(false);
    }
  };
  
  const handleSaveCustomization = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (!artwork) return;
    
    try {
      setSaving(true);
      
      // Convert options and save customization without adding to cart
      const customizationData = {
        Name: `Saved Custom ${artwork.title}`,
        size: options.size.scale === 75 ? 'small' :
              options.size.scale === 100 ? 'medium' :
              options.size.scale === 125 ? 'large' : 'xlarge',
        material: options.material || 'canvas',
        frame_style: options.frame.style,
        frame_color: options.frame.color,
        mat_enabled: options.mat.enabled,
        mat_color: options.mat.color,
        mat_width: options.mat.width,
        glass_type: options.glass.type,
        color_scheme: 'original',
        mounting_type: options.mounting.type,
        final_price: finalPrice,
        artwork_id: artwork.Id
      };
      
      await customizationService.createCustomizationOption(customizationData);
      
      setSuccessMessage('Customization saved successfully!');
      
      // Clear the success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error("Error saving customization:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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
        <span>Back to Artwork</span>
      </button>
      
      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg">
          {successMessage}
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        <div className="lg:col-span-1 overflow-hidden">
          <CustomizationPanel />
          
          {/* Price and action buttons */}
          <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-700">Final Price:</span>
              <span className="text-2xl font-bold">${finalPrice.toFixed(2)}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                disabled={addingToCart}
                className="flex items-center justify-center py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <ShoppingCart size={18} className="mr-2" />
                <span>{addingToCart ? 'Adding...' : 'Add to Cart'}</span>
              </button>
              
              <button
                onClick={handleSaveCustomization}
                disabled={saving}
                className="flex items-center justify-center py-2 px-4 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
              >
                <Save size={18} className="mr-2" />
                <span>{saving ? 'Saving...' : 'Save Design'}</span>
              </button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
          <PreviewDisplay />
        </div>
      </div>

      <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-4">About This Preview</h3>
        <p className="text-gray-600">
          This preview gives you a realistic representation of how your customized artwork will look. 
          The actual colors and appearance may vary slightly from what is shown on screen. 
          Our team will ensure the highest quality craftsmanship for your final piece.
        </p>
      </div>
    </div>
  );
}