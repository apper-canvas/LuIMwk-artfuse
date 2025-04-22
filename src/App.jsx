import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import ArtworkDetail from './pages/ArtworkDetail'
import ArtworkCustomizer from './pages/ArtworkCustomizer'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import { CustomizationProvider } from './contexts/CustomizationContext'

function App() {
  return (
    <Router>
      <CustomizationProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/artwork/:id" element={<ArtworkDetail />} />
              <Route path="/customize" element={<ArtworkCustomizer />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CustomizationProvider>
    </Router>
  )
}

export default App