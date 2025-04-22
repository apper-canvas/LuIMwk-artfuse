import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Palette, 
  Maximize, 
  Frame, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Check, 
  Info
} from 'lucide-react';

const MainFeature = () => {
  // Selected artwork state
  const [selectedArtwork, setSelectedArtwork] = useState({
    id: 1,
    title: "Abstract Harmony",
    artist: "Elena Rivera",
    image: "https://images.unsplash.com/photo-1549887534-1541e9326642?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: 149.99
  });
  
  // Customization options state
  const [customOptions, setCustomOptions] = useState({
    size: 'medium',
    material: 'canvas',
    frame: 'none',
    colorScheme: 'original'
  });
  
  // Price calculation state
  const [finalPrice, setFinalPrice] = useState(selectedArtwork.price);
  
  // Color scheme options
  const colorSchemes = [
    { id: 'original', name: 'Original', filter: 'none' },
    { id: 'monochrome', name: 'Monochrome', filter: 'grayscale(100%)' },
    { id: 'sepia', name: 'Sepia', filter: 'sepia(80%)' },
    { id: 'vibrant', name: 'Vibrant', filter: 'saturate(180%) contrast(120%)' },
    { id: 'cool', name: 'Cool Tone', filter: 'hue-rotate(30deg) saturate(120%)' },
    { id: 'warm', name: 'Warm Tone', filter: 'hue-rotate(-30deg) saturate(120%)' }
  ];
  
  // Size options with price modifiers
  const sizeOptions = [
    { id: 'small', name: 'Small (12" x 16")', priceModifier: 0.8 },
    { id: 'medium', name: 'Medium (18" x 24")', priceModifier: 1 },
    { id: 'large', name: 'Large (24" x 36")', priceModifier: 1.5 },
    { id: 'xlarge', name: 'Extra Large (36" x 48")', priceModifier: 2.2 }
  ];
  
  // Material options with price modifiers
  const materialOptions = [
    { id: 'canvas', name: 'Canvas Print', priceModifier: 1 },
    { id: 'paper', name: 'Fine Art Paper', priceModifier: 0.8 },
    { id: 'metal', name: 'Metal Print', priceModifier: 1.4 },
    { id: 'acrylic', name: 'Acrylic Glass', priceModifier: 1.6 }
  ];
  
  // Frame options with price modifiers
  const frameOptions = [
    { id: 'none', name: 'No Frame', priceModifier: 0 },
    { id: 'slim-black', name: 'Slim Black Frame', priceModifier: 50 },
    { id: 'modern-white', name: 'Modern White Frame', priceModifier: 60 },
    { id: 'wood-natural', name: 'Natural Wood Frame', priceModifier: 75 }
  ];
  
  // Success message state
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Calculate final price based on selected options
  useEffect(() => {
    const selectedSize = sizeOptions.find(size => size.id === customOptions.size);
    const selectedMaterial = materialOptions.find(material => material.id === customOptions.material);
    const selectedFrame = frameOptions.find(frame => frame.id === customOptions.frame);
    
    let newPrice = selectedArtwork.price * selectedSize.priceModifier * selectedMaterial.priceModifier;
    
    // Add frame cost if selected
    if (selectedFrame.id !== 'none') {
      newPrice += selectedFrame.priceModifier;
    }
    
    setFinalPrice(newPrice);
  }, [customOptions, selectedArtwork]);
  
  // Handle option changes
  const handleOptionChange = (category, value) => {
    setCustomOptions(prev => ({
      ...prev,
      [category]: value
    }));
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };
  
  // Get current color scheme filter
  const getCurrentFilter = () => {
    const scheme = colorSchemes.find(scheme => scheme.id === customOptions.colorScheme);
    return scheme ? scheme.filter : 'none';
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Artwork Preview */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="sticky top-24">
          <div className="relative rounded-xl overflow-hidden shadow-card aspect-square">
            <motion.img 
              src={selectedArtwork.image} 
              alt={selectedArtwork.title}
              className="w-full h-full object-cover"
              style={{ filter: getCurrentFilter() }}
              layoutId="artworkImage"
            />
            
            {/* Size indicator */}
            <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
              {sizeOptions.find(size => size.id === customOptions.size).name}
            </div>
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-lg">{selectedArtwork.title}</h3>
              <p className="text-surface-600 dark:text-surface-400 text-sm">by {selectedArtwork.artist}</p>
            </div>
            
            <div className="flex space-x-2">
              <button className="p-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors">
                <Heart size={20} className="text-surface-600 dark:text-surface-400" />
              </button>
              <button className="p-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors">
                <Share2 size={20} className="text-surface-600 dark:text-surface-400" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Customization Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="card p-6">
          <h3 className="text-xl font-semibold mb-6">Customize Your Artwork</h3>
          
          {/* Color Scheme Selection */}
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <Palette size={18} className="mr-2 text-primary" />
              <h4 className="font-medium">Color Scheme</h4>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {colorSchemes.map(scheme => (
                <button
                  key={scheme.id}
                  onClick={() => handleOptionChange('colorScheme', scheme.id)}
                  className={`relative p-2 rounded-lg border-2 transition-all ${
                    customOptions.colorScheme === scheme.id
                      ? 'border-primary bg-primary/5'
                      : 'border-surface-200 dark:border-surface-700 hover:border-primary/50'
                  }`}
                >
                  <div className="aspect-[4/3] rounded-md overflow-hidden mb-2">
                    <img 
                      src={selectedArtwork.image} 
                      alt={scheme.name}
                      className="w-full h-full object-cover"
                      style={{ filter: scheme.filter }}
                    />
                  </div>
                  <span className="text-sm font-medium block text-center">{scheme.name}</span>
                  
                  {customOptions.colorScheme === scheme.id && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                      <Check size={12} className="text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
          
          {/* Size Selection */}
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <Maximize size={18} className="mr-2 text-primary" />
              <h4 className="font-medium">Size</h4>
            </div>
            
            <div className="space-y-2">
              {sizeOptions.map(size => (
                <button
                  key={size.id}
                  onClick={() => handleOptionChange('size', size.id)}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                    customOptions.size === size.id
                      ? 'border-primary bg-primary/5'
                      : 'border-surface-200 dark:border-surface-700 hover:border-primary/50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{size.name}</span>
                    <span className="text-surface-600 dark:text-surface-400">
                      ${(selectedArtwork.price * size.priceModifier).toFixed(2)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Material Selection */}
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <Info size={18} className="mr-2 text-primary" />
              <h4 className="font-medium">Material</h4>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {materialOptions.map(material => (
                <button
                  key={material.id}
                  onClick={() => handleOptionChange('material', material.id)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    customOptions.material === material.id
                      ? 'border-primary bg-primary/5'
                      : 'border-surface-200 dark:border-surface-700 hover:border-primary/50'
                  }`}
                >
                  <span className="font-medium block text-center">{material.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Frame Selection */}
          <div className="mb-8">
            <div className="flex items-center mb-3">
              <Frame size={18} className="mr-2 text-primary" />
              <h4 className="font-medium">Frame</h4>
            </div>
            
            <div className="space-y-2">
              {frameOptions.map(frame => (
                <button
                  key={frame.id}
                  onClick={() => handleOptionChange('frame', frame.id)}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                    customOptions.frame === frame.id
                      ? 'border-primary bg-primary/5'
                      : 'border-surface-200 dark:border-surface-700 hover:border-primary/50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{frame.name}</span>
                    {frame.id !== 'none' && (
                      <span className="text-surface-600 dark:text-surface-400">
                        +${frame.priceModifier.toFixed(2)}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Price and Add to Cart */}
          <div className="border-t border-surface-200 dark:border-surface-700 pt-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-surface-600 dark:text-surface-400">Final Price:</span>
                <div className="text-2xl font-bold">${finalPrice.toFixed(2)}</div>
              </div>
              
              <div className="text-right text-sm text-surface-600 dark:text-surface-400">
                <p>Production Time: 5-7 days</p>
                <p>Free shipping</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={handleAddToCart}
                className="btn-primary flex-grow"
              >
                <ShoppingCart size={18} className="mr-2" />
                Add to Cart
              </button>
              
              <button className="btn-outline">
                <Heart size={18} className="mr-2" />
                Save
              </button>
            </div>
          </div>
        </div>
        
        {/* Success Message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-4 p-4 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-200 flex items-center"
            >
              <Check size={18} className="mr-2" />
              <span>Added to cart successfully!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default MainFeature;