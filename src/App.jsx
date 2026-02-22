import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Portfolio from './components/Portfolio'
import PhotoBooth from './components/PhotoBooth'
import Reviews from './components/Reviews'
import Contact from './components/Contact'
import AdminDashboard from './admin/AdminDashboard'
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

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<PublicSite />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </div>
  )
}

export default App
