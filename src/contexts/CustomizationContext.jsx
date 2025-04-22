import { createContext, useContext, useState } from 'react';
import { defaultCustomizationOptions } from '../utils/customizationOptions';

const CustomizationContext = createContext();

export const useCustomization = () => {
  const context = useContext(CustomizationContext);
  if (!context) {
    throw new Error('useCustomization must be used within a CustomizationProvider');
  }
  return context;
};

export const CustomizationProvider = ({ children }) => {
  const [artwork, setArtwork] = useState(null);
  const [options, setOptions] = useState(defaultCustomizationOptions);

  const updateOption = (category, option, value) => {
    setOptions(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [option]: value,
      }
    }));
  };

  const resetCustomization = () => {
    setOptions(defaultCustomizationOptions);
  };

  const setInitialArtwork = (artworkData) => {
    setArtwork(artworkData);
    resetCustomization();
  };

  const value = {
    artwork,
    options,
    updateOption,
    resetCustomization,
    setInitialArtwork,
  };

  return (
    <CustomizationContext.Provider value={value}>
      {children}
    </CustomizationContext.Provider>
  );
};