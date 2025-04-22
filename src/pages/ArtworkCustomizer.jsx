import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCustomization } from '../contexts/CustomizationContext';
import CustomizationPanel from '../components/customizer/CustomizationPanel';
import PreviewDisplay from '../components/customizer/PreviewDisplay';
import { ArrowLeft } from 'lucide-react';

export default function ArtworkCustomizer() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setInitialArtwork, artwork } = useCustomization();
  
  useEffect(() => {
    // Get artwork data from location state, or use a default if not available
    const artworkData = location.state?.artwork;
    
    if (artworkData) {
      setInitialArtwork(artworkData);
    } else if (!artwork) {
      // If no artwork in state and none already loaded, redirect back
      navigate('/gallery');
    }
  }, [location, setInitialArtwork, navigate, artwork]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={handleBack}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft size={20} className="mr-2" />
        <span>Back to Artwork</span>
      </button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        <div className="lg:col-span-1 overflow-hidden">
          <CustomizationPanel />
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