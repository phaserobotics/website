import GliderLogo from './GliderLogo'
import GameOfLife from './GameOfLife'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer" id="contact">
      {/* A lone glider, orbiting the strip forever */}
      <div className="footer__life">
        <GameOfLife
          cellSize={10}
          color="rgba(255, 255, 255, 0.4)"
          density={0}
          gliders={1}
          minPopulation={0}
          stepMs={140}
        />
      </div>

      <div className="container">
        <div className="footer__main">
          <div className="footer__brand">
            <a href="#" className="footer__logo" aria-label="Phase Robotics home">
              <GliderLogo size={30} />
              <span className="footer__wordmark">
                PHASE<span className="footer__wordmark-light">ROBOTICS</span>
              </span>
            </a>
            <p className="footer__tagline">
              Small precision actuators for robot hands and dexterous
              manipulators — and the machines that make them.
            </p>
          </div>

          <p className="footer__soon">
            LAUNCHING SOON<span className="cursor-blink" aria-hidden="true"></span>
          </p>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} PHASE ROBOTICS
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
