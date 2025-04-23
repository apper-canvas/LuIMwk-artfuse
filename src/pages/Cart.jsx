import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  CreditCard, 
  ArrowLeft,
  Palette
} from 'lucide-react';
import cartService from '../services/cartService';
import artworkService from '../services/artworkService';
import customizationService from '../services/customizationService';

export default function Cart() {
  const navigate = useNavigate();
  
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingArtworks, setLoadingArtworks] = useState(false);
  const [updatingQuantity, setUpdatingQuantity] = useState(null);
  const [removingItem, setRemovingItem] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Load cart items on mount
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true);
        const items = await cartService.fetchCartItems();
        setCartItems(items);
        
        // Fetch artwork details for each cart item
        setLoadingArtworks(true);
        const itemsWithDetails = await Promise.all(
          items.map(async (item) => {
            try {
              const artwork = await artworkService.fetchArtworkById(item.artwork_id);
              
              // If we have customization data
              let customization = null;
              if (item.customization_id) {
                const customizations = await customizationService.fetchCustomizationOptionsForArtwork(item.artwork_id);
                customization = customizations.find(c => c.Id === item.customization_id) || null;
              }
              
              return {
                ...item,
                artwork,
                customization
              };
            } catch (error) {
              console.error(`Error fetching details for cart item ${item.Id}:`, error);
              return {
                ...item,
                artwork: null,
                customization: null
              };
            }
          })
        );
        
        setCartItems(itemsWithDetails);
        calculateSubtotal(itemsWithDetails);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false);
        setLoadingArtworks(false);
      }
    };
    
    fetchCartItems();
  }, []);
  
  // Calculate subtotal
  const calculateSubtotal = (items) => {
    const total = items.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
    
    setSubtotal(total);
  };
  
  // Handle quantity changes
  const handleQuantityChange = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      setUpdatingQuantity(cartItemId);
      
      await cartService.updateCartItemQuantity(cartItemId, newQuantity);
      
      // Update the UI
      const updatedItems = cartItems.map(item => {
        if (item.Id === cartItemId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      
      setCartItems(updatedItems);
      calculateSubtotal(updatedItems);
      
      setSuccessMessage('Cart updated successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setUpdatingQuantity(null);
    }
  };
  
  // Handle item removal
  const handleRemoveItem = async (cartItemId) => {
    try {
      setRemovingItem(cartItemId);
      
      await cartService.removeFromCart(cartItemId);
      
      // Update the UI
      const updatedItems = cartItems.filter(item => item.Id !== cartItemId);
      setCartItems(updatedItems);
      calculateSubtotal(updatedItems);
      
      setSuccessMessage('Item removed from cart');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error("Error removing item:", error);
    } finally {
      setRemovingItem(null);
    }
  };
  
  // Handle checkout
  const handleCheckout = () => {
    // In a real application, this would navigate to checkout
    // For now, we'll just show a message
    setSuccessMessage('Checkout functionality will be implemented soon!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };
  
  // Render loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  // Render empty cart
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <ShoppingBag size={64} className="mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">
            Browse our gallery to discover beautiful artworks to customize and purchase.
          </p>
          <Link 
            to="/gallery" 
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Browse Gallery
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <button 
          onClick={() => navigate('/gallery')}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={20} className="mr-2" />
          <span>Continue Shopping</span>
        </button>
      </div>
      
      {successMessage && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
          {successMessage}
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {loadingArtworks ? (
              <div className="p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p>Loading artwork details...</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {cartItems.map(item => (
                  <li key={item.Id} className="p-6">
                    <div className="flex flex-col sm:flex-row">
                      {/* Artwork Image */}
                      <div className="w-full sm:w-32 h-32 mb-4 sm:mb-0 flex-shrink-0">
                        {item.artwork ? (
                          <img 
                            src={item.artwork.image} 
                            alt={item.artwork.title} 
                            className="w-full h-full object-cover rounded-md"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
                            <span className="text-gray-500">No image</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Item Details */}
                      <div className="sm:ml-6 flex-grow">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-lg font-semibold">
                              {item.artwork ? item.artwork.title : 'Artwork'}
                            </h3>
                            <p className="text-gray-600">
                              {item.artwork ? `by ${item.artwork.artist}` : ''}
                            </p>
                          </div>
                          <p className="font-bold">${item.price.toFixed(2)}</p>
                        </div>
                        
                        {/* Customization Details */}
                        {item.customization && (
                          <div className="mt-2 p-2 bg-gray-50 rounded-md text-sm">
                            <p className="font-medium">Customization:</p>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1">
                              <p>Size: <span className="text-gray-600">{item.customization.size}</span></p>
                              <p>Material: <span className="text-gray-600">{item.customization.material}</span></p>
                              <p>Frame: <span className="text-gray-600">{item.customization.frame_style} ({item.customization.frame_color})</span></p>
                              {item.customization.mat_enabled && (
                                <p>Mat: <span className="text-gray-600">{item.customization.mat_color}</span></p>
                              )}
                            </div>
                          </div>
                        )}
                        
                        {/* Actions */}
                        <div className="mt-4 flex justify-between items-center">
                          <div className="flex items-center border rounded-md">
                            <button 
                              onClick={() => handleQuantityChange(item.Id, item.quantity - 1)}
                              disabled={updatingQuantity === item.Id || item.quantity <= 1}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-4 py-1">{item.quantity}</span>
                            <button 
                              onClick={() => handleQuantityChange(item.Id, item.quantity + 1)}
                              disabled={updatingQuantity === item.Id}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          
                          <div className="flex space-x-2">
                            {item.artwork && (
                              <Link 
                                to={`/customize`} 
                                state={{ artwork: item.artwork }}
                                className="flex items-center text-blue-600 hover:text-blue-800"
                              >
                                <Palette size={18} className="mr-1" />
                                <span>Customize</span>
                              </Link>
                            )}
                            
                            <button 
                              onClick={() => handleRemoveItem(item.Id)}
                              disabled={removingItem === item.Id}
                              className="flex items-center text-red-600 hover:text-red-800"
                            >
                              <Trash2 size={18} className="mr-1" />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <p className="text-gray-500 text-sm mt-1">Tax included where applicable</p>
              </div>
            </div>
            
            <button 
              onClick={handleCheckout}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center"
            >
              <CreditCard size={18} className="mr-2" />
              <span>Proceed to Checkout</span>
            </button>
            
            <div className="mt-4 text-sm text-gray-600">
              <p className="mb-2">Secure checkout powered by Stripe</p>
              <p>All artworks are made to order and will ship within 7-10 business days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}