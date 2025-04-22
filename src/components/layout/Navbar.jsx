import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, Palette } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600';
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600">ArtFuse</h1>
            </Link>
            
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link to="/" className={`font-medium ${isActive('/')}`}>
                Home
              </Link>
              <Link to="/gallery" className={`font-medium ${isActive('/gallery')}`}>
                Gallery
              </Link>
              <Link to="/about" className={`font-medium ${isActive('/about')}`}>
                About
              </Link>
              <Link to="/contact" className={`font-medium ${isActive('/contact')}`}>
                Contact
              </Link>
              <Link to="/customize" className={`font-medium ${isActive('/customize')}`}>
                <div className="flex items-center">
                  <Palette size={18} className="mr-1" />
                  <span>Customize</span>
                </div>
              </Link>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700">
              <Search size={20} />
            </button>
            <Link to="/cart" className="text-gray-500 hover:text-gray-700 relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <button className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Sign In
            </button>
          </div>
          
          <div className="md:hidden flex items-center">
            <Link to="/cart" className="text-gray-500 hover:text-gray-700 relative mr-4">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 space-y-2">
            <Link 
              to="/" 
              className={`block py-2 font-medium ${isActive('/')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/gallery" 
              className={`block py-2 font-medium ${isActive('/gallery')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link 
              to="/about" 
              className={`block py-2 font-medium ${isActive('/about')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`block py-2 font-medium ${isActive('/contact')}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              to="/customize" 
              className={`block py-2 font-medium ${isActive('/customize')} flex items-center`}
              onClick={() => setIsMenuOpen(false)}
            >
              <Palette size={18} className="mr-1" />
              <span>Customize</span>
            </Link>
            <div className="pt-2 border-t">
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}