import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Palette, Zap, Heart } from 'lucide-react';
import MainFeature from '../components/MainFeature';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All Art' },
    { id: 'paintings', name: 'Paintings' },
    { id: 'prints', name: 'Prints' },
    { id: 'digital', name: 'Digital Art' },
    { id: 'sculptures', name: 'Sculptures' }
  ];
  
  const featuredArtworks = [
    {
      id: 1,
      title: "Abstract Harmony",
      artist: "Elena Rivera",
      image: "https://images.unsplash.com/photo-1549887534-1541e9326642?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "paintings",
      customizable: true
    },
    {
      id: 2,
      title: "Urban Perspective",
      artist: "Marcus Chen",
      image: "https://images.unsplash.com/photo-1578926288207-32356a2b803c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "prints",
      customizable: true
    },
    {
      id: 3,
      title: "Digital Dreams",
      artist: "Sophia Kim",
      image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "digital",
      customizable: true
    },
    {
      id: 4,
      title: "Geometric Wonder",
      artist: "Jamal Wilson",
      image: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "sculptures",
      customizable: true
    },
    {
      id: 5,
      title: "Serene Landscape",
      artist: "Olivia Parker",
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "paintings",
      customizable: true
    },
    {
      id: 6,
      title: "Neon Cityscape",
      artist: "David Zhang",
      image: "https://images.unsplash.com/photo-1604871000636-074fa5117945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "digital",
      customizable: true
    }
  ];
  
  const filteredArtworks = selectedCategory === 'all' 
    ? featuredArtworks 
    : featuredArtworks.filter(artwork => artwork.category === selectedCategory);
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/5 dark:to-secondary/5">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-gradient">Customize</span> Art That Speaks to You
              </h1>
              <p className="text-lg md:text-xl text-surface-600 dark:text-surface-300 mb-8">
                Create personalized art pieces that perfectly match your style and space. 
                Adjust colors, dimensions, and materials to make it uniquely yours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#customize" className="btn-primary">
                  Start Customizing
                  <ArrowRight size={18} className="ml-2" />
                </a>
                <a href="#gallery" className="btn-outline">
                  Explore Gallery
                </a>
              </div>
              
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center text-center p-3 rounded-lg bg-white/50 dark:bg-surface-800/50 backdrop-blur-sm">
                  <Palette className="text-primary mb-2" size={24} />
                  <span className="text-sm font-medium">Unlimited Colors</span>
                </div>
                <div className="flex flex-col items-center text-center p-3 rounded-lg bg-white/50 dark:bg-surface-800/50 backdrop-blur-sm">
                  <Zap className="text-accent mb-2" size={24} />
                  <span className="text-sm font-medium">Instant Preview</span>
                </div>
                <div className="flex flex-col items-center text-center p-3 rounded-lg bg-white/50 dark:bg-surface-800/50 backdrop-blur-sm">
                  <Heart className="text-secondary mb-2" size={24} />
                  <span className="text-sm font-medium">Made For You</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-soft aspect-[4/3]">
                <img 
                  src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                  alt="Art customization preview" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Abstract Harmony</h3>
                      <p className="text-sm text-surface-600 dark:text-surface-400">Customized by you</p>
                    </div>
                    <span className="text-primary font-semibold">$149.99</span>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/20 dark:bg-primary/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-secondary/20 dark:bg-secondary/10 rounded-full blur-xl"></div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Main Feature Section */}
      <section id="customize" className="py-16 bg-white dark:bg-surface-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Customize Your <span className="text-gradient">Masterpiece</span>
            </motion.h2>
            <p className="text-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
              Select an artwork and make it yours with our interactive customization tool.
              Adjust colors, size, and materials to create your perfect piece.
            </p>
          </div>
          
          <MainFeature />
        </div>
      </section>
      
      {/* Gallery Section */}
      <section id="gallery" className="py-16 bg-surface-50 dark:bg-surface-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Explore Our <span className="text-gradient">Gallery</span>
            </motion.h2>
            <p className="text-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
              Browse through our collection of customizable artworks from talented artists.
            </p>
          </div>
          
          <div className="flex overflow-x-auto scrollbar-hide space-x-2 pb-4 mb-8">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-white dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtworks.map(artwork => (
              <motion.div
                key={artwork.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="card group"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={artwork.image} 
                    alt={artwork.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {artwork.customizable && (
                    <div className="absolute top-3 right-3 bg-primary text-white text-xs px-2 py-1 rounded-full">
                      Customizable
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{artwork.title}</h3>
                  <p className="text-surface-600 dark:text-surface-400 text-sm mb-3">by {artwork.artist}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-primary font-medium">From $129.99</span>
                    <a href="#customize" className="btn-primary py-1 px-3 text-sm">
                      Customize
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a href="#" className="btn-outline">
              View All Artworks
              <ArrowRight size={18} className="ml-2" />
            </a>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 bg-white dark:bg-surface-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              How <span className="text-gradient">ArtFuse</span> Works
            </motion.h2>
            <p className="text-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
              Creating your custom art piece is simple with our easy-to-use platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card p-6 text-center"
            >
              <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Choose an Artwork</h3>
              <p className="text-surface-600 dark:text-surface-400">
                Browse our gallery and select an artwork that resonates with your style.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card p-6 text-center"
            >
              <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Customize It</h3>
              <p className="text-surface-600 dark:text-surface-400">
                Personalize colors, dimensions, materials, and other details to make it yours.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="card p-6 text-center"
            >
              <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Receive Your Art</h3>
              <p className="text-surface-600 dark:text-surface-400">
                We'll carefully produce and ship your custom artwork directly to your door.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/5 dark:to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Ready to Create Your <span className="text-gradient">Custom Masterpiece</span>?
            </motion.h2>
            <p className="text-lg text-surface-600 dark:text-surface-400 mb-8">
              Start customizing today and transform your space with art that's uniquely yours.
            </p>
            <a href="#customize" className="btn-primary text-lg px-8 py-3">
              Start Creating Now
              <ArrowRight size={20} className="ml-2" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;