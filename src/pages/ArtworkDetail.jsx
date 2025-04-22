import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Palette } from 'lucide-react';

// Mock data - in a real app, you would fetch this from an API
const artworkData = {
  1: {
    id: 1,
    title: 'Abstract Harmony',
    artist: 'Elena Rodriguez',
    image: 'https://images.unsplash.com/photo-1549887534-1541e9326642?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 450,
    description: 'A vibrant exploration of color and form, this abstract piece evokes feelings of joy and harmony through its dynamic composition and bold color palette.',
    medium: 'Acrylic on canvas',
    dimensions: '24" x 36"',
    year: 2022,
    category: 'Abstract',
  },
  2: {
    id: 2,
    title: 'Serene Landscape',
    artist: 'Thomas Chen',
    image: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 350,
    description: 'This peaceful landscape captures the tranquility of a misty morning by the lake. The subtle color palette and soft brushwork create a sense of calm and reflection.',
    medium: 'Oil on canvas',
    dimensions: '30" x 40"',
    year: 2021,
    category: 'Landscape',
  },
  3: {
    id: 3,
    title: 'Urban Perspective',
    artist: 'Maya Johnson',
    image: 'https://images.unsplash.com/photo-1578926288207-32356a8016e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 525,
    description: 'A dynamic cityscape that plays with perspective and architectural forms. This piece captures the energy and rhythm of urban life through bold lines and geometric shapes.',
    medium: 'Mixed media on panel',
    dimensions: '36" x 48"',
    year: 2023,
    category: 'Urban',
  },
};

export default function ArtworkDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const art = artworkData[id];
      if (art) {
        setArtwork(art);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleCustomize = () => {
    navigate('/customize', { state: { artwork } });
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
              onClick={() => setLiked(!liked)}
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
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Add to Cart
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