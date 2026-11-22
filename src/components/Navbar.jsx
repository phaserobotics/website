import GliderLogo from './GliderLogo'
import './Navbar.css'

const LINKS = [
  { href: '#products', label: 'Products' },
  { href: '#thesis', label: 'Thesis' },
  { href: '#contact', label: 'Contact' },
]

function Navbar() {
  return (
    <nav className="navbar" aria-label="Primary">
      <div className="navbar__container">
        <a href="#" className="navbar__logo" aria-label="Phase Robotics home">
          <GliderLogo size={22} />
          <span className="navbar__wordmark">
            PHASE<span className="navbar__wordmark-light">ROBOTICS</span>
          </span>
        </a>

        <div className="navbar__links">
          {LINKS.map((link, index) => (
            <a key={link.href} href={link.href} className="navbar__link">
              <span className="navbar__link-index">0{index + 1}</span>
              {link.label}
            </a>
          ))}
        </div>

        <a href="#contact" className="navbar__cta">
          Early access <span aria-hidden="true">→</span>
        </a>
      </div>
    </nav>
  )
}

export default Navbar
