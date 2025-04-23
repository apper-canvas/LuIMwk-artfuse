import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Grid, List, Heart } from 'lucide-react';
import artworkService from '../services/artworkService';
import savedArtworkService from '../services/savedArtworkService';
import { useAuth } from '../contexts/AuthContext';

export default function Gallery() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [filter, setFilter] = useState({
    category: '',
    priceRange: '',
    searchQuery: ''
  });
  
  const { isAuthenticated } = useAuth();
  const [savedArtworkIds, setSavedArtworkIds] = useState([]);
  
  // Fetch artworks on component mount and when filter changes
  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        setLoading(true);
        
        const filters = {};
        if (filter.category) {
          filters.category = filter.category;
        }
        
        // For price range, we would need to add more complex filtering
        // This would depend on how the backend handles range queries
        
        const artworksData = await artworkService.fetchArtworks(filters);
        setArtworks(artworksData);
        
        // If authenticated, fetch saved artworks
        if (isAuthenticated) {
          const savedArtworks = await savedArtworkService.fetchSavedArtworks();
          const ids = savedArtworks.map(saved => saved.artwork_id);
          setSavedArtworkIds(ids);
        }
      } catch (error) {
        console.error("Error fetching artworks:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchArtworks();
  }, [filter, isAuthenticated]);
  
  // Filter by search query
  const filteredArtworks = artworks.filter(artwork => {
    if (!filter.searchQuery) return true;
    
    const query = filter.searchQuery.toLowerCase();
    return (
      artwork.title.toLowerCase().includes(query) ||
      artwork.artist.toLowerCase().includes(query) ||
      artwork.description.toLowerCase().includes(query) ||
      artwork.category.toLowerCase().includes(query)
    );
  });
  
  // Handle price range filtering
  const filterByPriceRange = (artwork) => {
    if (!filter.priceRange) return true;
    
    switch (filter.priceRange) {
      case 'under100':
        return artwork.price < 100;
      case '100to500':
        return artwork.price >= 100 && artwork.price <= 500;
      case 'over500':
        return artwork.price > 500;
      default:
        return true;
    }
  };
  
  // Apply all filters
  const displayedArtworks = filteredArtworks.filter(filterByPriceRange);
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setFilter({
      ...filter,
      searchQuery: e.target.value
    });
  };
  
  // Handle category filter change
  const handleCategoryChange = (category) => {
    setFilter({
      ...filter,
      category: category
    });
  };
  
  // Handle price range filter change
  const handlePriceRangeChange = (range) => {
    setFilter({
      ...filter,
      priceRange: range
    });
  };
  
  // Toggle save artwork
  const handleToggleSave = async (e, artworkId) => {
    e.preventDefault(); // Prevent navigation to artwork detail
    
    if (!isAuthenticated) {
      // Redirect to login or show login prompt
      return;
    }
    
    try {
      if (savedArtworkIds.includes(artworkId)) {
        await savedArtworkService.unsaveArtwork(artworkId);
        setSavedArtworkIds(prev => prev.filter(id => id !== artworkId));
      } else {
        await savedArtworkService.saveArtwork(artworkId);
        setSavedArtworkIds(prev => [...prev, artworkId]);
      }
    } catch (error) {
      console.error("Error toggling save:", error);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Artwork Gallery</h1>
      
      {/* Search and Filter Bar */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-4">
          <div className="relative flex-grow max-w-md">
            <input
              type="text"
              value={filter.searchQuery}
              onChange={handleSearchChange}
              placeholder="Search artworks..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-gray-700">View:</span>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <Filter size={18} className="text-gray-600" />
            <span className="text-gray-700">Category:</span>
            <select
              value={filter.category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="border rounded-md px-2 py-1"
            >
              <option value="">All Categories</option>
              <option value="Abstract">Abstract</option>
              <option value="Landscape">Landscape</option>
              <option value="Urban">Urban</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-gray-700">Price:</span>
            <select
              value={filter.priceRange}
              onChange={(e) => handlePriceRangeChange(e.target.value)}
              className="border rounded-md px-2 py-1"
            >
              <option value="">All Prices</option>
              <option value="under100">Under $100</option>
              <option value="100to500">$100 - $500</option>
              <option value="over500">Over $500</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {/* No Results */}
      {!loading && displayedArtworks.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">No artworks found</h2>
          <p className="text-gray-500">Try adjusting your filters or search query</p>
        </div>
      )}
      
      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedArtworks.map(artwork => (
            <Link
              to={`/artwork/${artwork.Id}`}
              key={artwork.Id}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-square">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={(e) => handleToggleSave(e, artwork.Id)}
                  className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md ${
                    savedArtworkIds.includes(artwork.Id) ? 'text-red-500' : 'text-gray-400'
                  }`}
                >
                  <Heart size={16} fill={savedArtworkIds.includes(artwork.Id) ? "currentColor" : "none"} />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg truncate">{artwork.title}</h3>
                <p className="text-gray-600 truncate">by {artwork.artist}</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="font-bold">${artwork.price}</span>
                  <span className="text-sm text-gray-500">{artwork.category}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      
      {/* List View */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {displayedArtworks.map(artwork => (
            <Link
              to={`/artwork/${artwork.Id}`}
              key={artwork.Id}
              className="flex bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="w-32 sm:w-48 h-32 flex-shrink-0">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex-grow">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{artwork.title}</h3>
                    <p className="text-gray-600">by {artwork.artist}</p>
                  </div>
                  <button
                    onClick={(e) => handleToggleSave(e, artwork.Id)}
                    className={`h-8 w-8 flex items-center justify-center ${
                      savedArtworkIds.includes(artwork.Id) ? 'text-red-500' : 'text-gray-400'
                    }`}
                  >
                    <Heart size={16} fill={savedArtworkIds.includes(artwork.Id) ? "currentColor" : "none"} />
                  </button>
                </div>
                <p className="text-gray-700 mt-2 line-clamp-2">{artwork.description}</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="font-bold">${artwork.price}</span>
                  <span className="text-sm text-gray-500">
                    {artwork.category} • {artwork.medium}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}