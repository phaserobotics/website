import { useState, useEffect } from 'react'
import GliderLogo from './GliderLogo'
import './Navbar.css'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__container">
        <a href="#" className="navbar__logo" aria-label="Phase Robotics home">
          <GliderLogo size={26} />
          <span className="navbar__wordmark">
            PHASE<span className="navbar__wordmark-light">ROBOTICS</span>
          </span>
        </a>
        <span className="chip navbar__status">
          <span className="dot dot--pulse" aria-hidden="true"></span>
          LAUNCHING SOON
        </span>
      </div>
    </nav>
  )
}

export default Navbar
