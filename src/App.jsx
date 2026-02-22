import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Portfolio from './components/Portfolio'
import PhotoBooth from './components/PhotoBooth'
import Reviews from './components/Reviews'
import Contact from './components/Contact'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <Header />
      <Hero />
      <Portfolio />
      <PhotoBooth />
      <Reviews />
      <About />
      <Contact />
    </div>
  )
}

export default App
