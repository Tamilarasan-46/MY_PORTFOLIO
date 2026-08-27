import './App.css'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Education from './sections/Education'
import Contact from './sections/Contact'
import Navigation from './components/Navigation'
import WhatsAppFab from './components/WhatsAppFab'

function App() {
  return (
    // CSS-driven mount fade — no setState-on-mount effect needed.
    <div className="min-h-screen bg-canvas text-fg-muted animate-fade-in">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <Navigation />

      <main id="main" className="relative">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>

      <WhatsAppFab />
    </div>
  )
}

export default App
