import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Lineup from './components/Lineup'
import Footer from './components/Footer'

function App() {
  // One observer drives every [data-reveal] fade-in on the page
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Lineup />
      </main>
      <Footer />
    </div>
  )
}

export default App
