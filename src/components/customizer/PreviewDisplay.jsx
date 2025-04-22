import { useCustomization } from '../../contexts/CustomizationContext';
import { useEffect, useState } from 'react';
import { frameColors, matColors } from '../../utils/customizationOptions';

export default function PreviewDisplay() {
  const { artwork, options } = useCustomization();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (artwork) {
      const img = new Image();
      img.src = artwork.image;
      img.onload = () => setLoading(false);
    }
  }, [artwork]);

  if (!artwork) {
    return (
      <div className="bg-gray-100 rounded-lg flex items-center justify-center h-full">
        <p className="text-gray-500">Select an artwork to customize</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-gray-100 rounded-lg flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Calculate dimensions based on options
  const scale = options.size.scale / 100;
  
  // Frame width in pixels
  const getFrameWidth = () => {
    switch (options.frame.width) {
      case 'thin': return 10;
      case 'medium': return 20;
      case 'thick': return 30;
      default: return 20;
    }
  };
  
  // Mat width in pixels
  const getMatWidth = () => {
    if (!options.mat.enabled) return 0;
    
    switch (options.mat.width) {
      case 'narrow': return 20;
      case 'standard': return 40;
      case 'wide': return 60;
      default: return 40;
    }
  };

  const frameWidth = getFrameWidth();
  const matWidth = getMatWidth();
  const frameColor = frameColors[options.frame.color]?.hex || '#000000';
  const matColor = matColors[options.mat.color]?.hex || '#FFFFFF';

  return (
    <div className="bg-gray-100 rounded-lg flex items-center justify-center h-full p-8">
      <div 
        className="relative"
        style={{
          transform: `scale(${scale})`,
          transition: 'transform 0.3s ease'
        }}
      >
        {/* Frame */}
        <div 
          className="absolute inset-0"
          style={{
            border: `${frameWidth}px solid ${frameColor}`,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)'
          }}
        ></div>
        
        {/* Mat */}
        {options.mat.enabled && (
          <div 
            className="absolute"
            style={{
              top: frameWidth,
              left: frameWidth,
              right: frameWidth,
              bottom: frameWidth,
              backgroundColor: matColor,
              border: `${matWidth}px solid ${matColor}`
            }}
          ></div>
        )}
        
        {/* Artwork */}
        <img 
          src={artwork.image} 
          alt={artwork.title}
          className="relative"
          style={{
            display: 'block',
            maxWidth: '600px',
            maxHeight: '400px',
            objectFit: 'contain',
            padding: `${frameWidth + (options.mat.enabled ? matWidth : 0)}px`
          }}
        />
        
        {/* Glass reflection effect */}
        {options.glass.type !== 'noGlass' && (
          <div 
            className="absolute"
            style={{
              top: frameWidth,
              left: frameWidth,
              right: frameWidth,
              bottom: frameWidth,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%)',
              pointerEvents: 'none',
              opacity: options.glass.glareReduction ? 0.3 : 0.6
            }}
          ></div>
        )}
      </div>
    </div>
  );
}