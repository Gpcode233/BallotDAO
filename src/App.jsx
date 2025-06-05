import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Proposals from './pages/Proposals.jsx'
import Results from './pages/Results.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Profile from './pages/Profile.jsx'
import './App.css'

function App() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)

  return (
    <>
      <Navbar 
        setIsWalletConnected={setIsWalletConnected} 
        isWalletConnected={isWalletConnected}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/proposals" element={<Proposals />} />
        <Route path="/results" element={<Results />} />
        <Route
          path="/dashboard"
          element={<Dashboard isWalletConnected={isWalletConnected} />}
        />
        <Route
          path="/profile"
          element={<Profile isWalletConnected={isWalletConnected} />}
        />
      </Routes>
      <Footer />
    </>
  )
}

export default App
