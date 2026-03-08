import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './firebase'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Portfolio from './components/Portfolio'
import PhotoBooth from './components/PhotoBooth'
import Reviews from './components/Reviews'
import Contact from './components/Contact'
import AdminDashboard from './admin/AdminDashboard'
import AdminLogin from './admin/AdminLogin'
import './App.css'

function PublicSite() {
  return (
    <>
      <Header />
      <Hero />
      <Portfolio />
      <PhotoBooth />
      <Reviews />
      <About />
      <Contact />
    </>
  )
}

function ProtectedAdmin() {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  if (user === undefined) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#0a0a0a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#d4af37',
        fontSize: '1rem',
        fontFamily: 'Inter, sans-serif'
      }}>
        Loading...
      </div>
    )
  }

  if (!user || user.email !== 'snow@mailinator.com') {
    // If a different user is logged in somehow, sign them out
    if (user && user.email !== 'snow@mailinator.com') {
      signOut(auth);
    }
    return <AdminLogin />
  }

  return <AdminDashboard user={user} />
}

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<PublicSite />} />
        <Route path="/admin" element={<ProtectedAdmin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
