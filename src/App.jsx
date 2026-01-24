import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Wedding from './components/Wedding'
import Events from './components/Events'
import Portraits from './components/Portraits'
import Reviews from './components/Reviews'
import Contact from './components/Contact'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <Header />
      <Hero />
      <About />
      <Wedding />
      <Events />
      <Portraits />
      <Reviews />
      <Contact />
    </div>
  )
}

export default App
