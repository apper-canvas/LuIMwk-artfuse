export const defaultCustomizationOptions = {
  frame: {
    style: 'classic',
    color: 'black',
    width: 'medium',
  },
  mat: {
    enabled: true,
    color: 'white',
    width: 'standard',
  },
  glass: {
    type: 'clear',
    glareReduction: false,
  },
  size: {
    scale: 100, // percentage
    aspectRatio: 'original',
  },
  mounting: {
    type: 'wall',
    hardware: 'standard',
  }
};

export const frameStyles = {
  classic: { name: 'Classic', description: 'Traditional wooden frame' },
  modern: { name: 'Modern', description: 'Sleek, minimal design' },
  ornate: { name: 'Ornate', description: 'Decorative and detailed' },
  floating: { name: 'Floating', description: 'Creates an illusion that artwork is floating' },
  noFrame: { name: 'No Frame', description: 'Canvas only, no frame' },
};

export const frameColors = {
  black: { name: 'Black', hex: '#000000' },
  white: { name: 'White', hex: '#FFFFFF' },
  naturalWood: { name: 'Natural Wood', hex: '#D2B48C' },
  walnut: { name: 'Walnut', hex: '#5C4033' },
  mahogany: { name: 'Mahogany', hex: '#8B4513' },
  gold: { name: 'Gold', hex: '#D4AF37' },
  silver: { name: 'Silver', hex: '#C0C0C0' },
};

export const matColors = {
  white: { name: 'White', hex: '#FFFFFF' },
  offWhite: { name: 'Off-White', hex: '#F5F5F5' },
  black: { name: 'Black', hex: '#000000' },
  cream: { name: 'Cream', hex: '#FFFDD0' },
  lightGray: { name: 'Light Gray', hex: '#D3D3D3' },
  darkGray: { name: 'Dark Gray', hex: '#A9A9A9' },
  navy: { name: 'Navy', hex: '#000080' },
};

export const glassTypes = {
  clear: { name: 'Clear', description: 'Standard clear glass' },
  nonGlare: { name: 'Non-Glare', description: 'Reduces reflections' },
  uvProtection: { name: 'UV Protection', description: 'Blocks harmful UV rays' },
  museumGlass: { name: 'Museum Glass', description: 'Premium clarity with UV protection' }
};

export const sizeOptions = {
  small: { name: 'Small', scale: 75 },
  medium: { name: 'Medium', scale: 100 },
  large: { name: 'Large', scale: 125 },
  extraLarge: { name: 'Extra Large', scale: 150 },
};

export const aspectRatios = {
  original: { name: 'Original', value: 'original' },
  square: { name: 'Square (1:1)', value: '1:1' },
  standard: { name: 'Standard (4:3)', value: '4:3' },
  widescreen: { name: 'Widescreen (16:9)', value: '16:9' },
  panoramic: { name: 'Panoramic (2:1)', value: '2:1' },
};

export const mountingOptions = {
  wall: { name: 'Wall Mount', description: 'Standard wall mounting hardware' },
  easel: { name: 'Easel', description: 'Display on a tabletop or shelf' },
  standoff: { name: 'Standoff', description: 'Modern floating look from wall' },
  clipFrame: { name: 'Clip Frame', description: 'Minimalist glass clip mounting' },
};