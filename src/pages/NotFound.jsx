import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="mb-8">
          <div className="relative inline-block">
            <span className="text-8xl font-bold text-gradient">404</span>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/20 dark:bg-primary/10 rounded-full blur-xl -z-10"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-secondary/20 dark:bg-secondary/10 rounded-full blur-xl -z-10"></div>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-surface-600 dark:text-surface-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back to creating beautiful art.
        </p>
        
        <Link to="/" className="btn-primary inline-flex items-center">
          <ArrowLeft size={18} className="mr-2" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;