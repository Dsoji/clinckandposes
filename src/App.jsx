import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Wedding from './components/Wedding'
import Events from './components/Events'
import PhotoBooth from './components/PhotoBooth'
import Portraits from './components/Portraits'
import Reviews from './components/Reviews'
import Contact from './components/Contact'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <Header />
      <Hero />
      <Wedding />
      <Events />
      <PhotoBooth />
      <Portraits />
      <Reviews />
      <About />
      <Contact />
    </div>
  )
}

export default App
