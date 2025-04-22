import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Sun, Moon, Menu, X, ShoppingCart, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);
  
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-blur border-b border-surface-200 dark:border-surface-700">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div 
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold text-gradient"
            >
              ArtFuse
            </motion.div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/" className="font-medium hover:text-primary transition-colors">Home</a>
            <a href="#" className="font-medium hover:text-primary transition-colors">Gallery</a>
            <a href="#" className="font-medium hover:text-primary transition-colors">Artists</a>
            <a href="#" className="font-medium hover:text-primary transition-colors">How It Works</a>
          </nav>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleDarkMode} 
              className="p-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <a href="#" className="p-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors relative">
              <ShoppingCart size={20} />
              <span className="absolute top-0 right-0 bg-secondary text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                0
              </span>
            </a>
            
            <a href="#" className="hidden md:flex p-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors">
              <User size={20} />
            </a>
            
            <button 
              onClick={toggleMobileMenu}
              className="p-2 md:hidden rounded-full hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700"
            >
              <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
                <a href="/" className="py-2 font-medium hover:text-primary transition-colors">Home</a>
                <a href="#" className="py-2 font-medium hover:text-primary transition-colors">Gallery</a>
                <a href="#" className="py-2 font-medium hover:text-primary transition-colors">Artists</a>
                <a href="#" className="py-2 font-medium hover:text-primary transition-colors">How It Works</a>
                <a href="#" className="py-2 font-medium hover:text-primary transition-colors">Account</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      <footer className="bg-surface-100 dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ArtFuse</h3>
              <p className="text-surface-600 dark:text-surface-400">
                Customize and purchase unique art pieces tailored to your style and space.
              </p>
            </div>
            
            <div>
              <h4 className="text-md font-semibold mb-4">Explore</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary transition-colors">Gallery</a></li>
                <li><a href="#" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary transition-colors">Artists</a></li>
                <li><a href="#" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary transition-colors">Collections</a></li>
                <li><a href="#" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary transition-colors">Custom Orders</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-md font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary transition-colors">How It Works</a></li>
                <li><a href="#" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary transition-colors">For Artists</a></li>
                <li><a href="#" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-md font-semibold mb-4">Stay Updated</h4>
              <p className="text-surface-600 dark:text-surface-400 mb-4">
                Subscribe to our newsletter for the latest art trends and exclusive offers.
              </p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="input rounded-r-none"
                />
                <button className="btn-primary rounded-l-none">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-surface-200 dark:border-surface-700 text-center text-surface-500 dark:text-surface-400">
            <p>© {new Date().getFullYear()} ArtFuse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;