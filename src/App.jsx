import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import ArtworkDetail from './pages/ArtworkDetail'
import ArtworkCustomizer from './pages/ArtworkCustomizer'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Login from './pages/Login'
import { CustomizationProvider } from './contexts/CustomizationContext'
import { AuthProvider } from './contexts/AuthContext'
import { useAuth } from './contexts/AuthContext'

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <CustomizationProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/artwork/:id" element={<ArtworkDetail />} />
                <Route path="/customize" element={
                  <ProtectedRoute>
                    <ArtworkCustomizer />
                  </ProtectedRoute>
                } />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                } />
                <Route path="/login" element={<Login />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CustomizationProvider>
      </AuthProvider>
    </Router>
  )
}

export default App