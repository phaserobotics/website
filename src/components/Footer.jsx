import GliderLogo from './GliderLogo'
import GameOfLife from './GameOfLife'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      {/* A lone glider, orbiting the strip forever */}
      <div className="footer__life">
        <GameOfLife
          cellSize={12}
          color="rgba(134, 199, 166, 0.55)"
          density={0}
          gliders={1}
          minPopulation={0}
          stepMs={140}
        />
      </div>

      <div className="container footer__main">
        <a href="#" className="footer__logo" aria-label="Phase Robotics home">
          <GliderLogo size={26} />
          <span className="footer__wordmark">
            PHASE<span className="footer__wordmark-light">ROBOTICS</span>
          </span>
        </a>

        <nav className="footer__links" aria-label="Footer">
          <a href="#products">Products</a>
          <a href="#thesis">Thesis</a>
          <a href="#contact">Contact</a>
        </nav>

        <p className="footer__copyright">
          © {new Date().getFullYear()} PHASE ROBOTICS
        </p>
      </div>
    </footer>
  )
}

export default Footer
