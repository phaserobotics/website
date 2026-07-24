import GliderLogo from './GliderLogo'
import GameOfLife from './GameOfLife'
import './Footer.css'

const COLUMNS = [
  {
    title: 'Products',
    links: [
      { name: 'Lunar Drive V2.1', href: '#products' },
      { name: 'Phalanx Drive', href: '#products' },
      { name: 'Atlas Drive — soon', href: '#products' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'Why Phase', href: '#why' },
      { name: 'About', href: '#about' },
      { name: 'Contact', href: 'mailto:phase.robotics@gmail.com' },
    ],
  },
]

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
              Easy-to-use, affordable robotic actuators.
              Precise, modular, and ready for any robot.
            </p>
            <a href="mailto:phase.robotics@gmail.com" className="footer__email">
              → phase.robotics@gmail.com
            </a>
          </div>

          <div className="footer__links">
            {COLUMNS.map((column) => (
              <div key={column.title} className="footer__column">
                <h4 className="footer__column-title">{column.title}</h4>
                <ul className="footer__list">
                  {column.links.map((link) => (
                    <li key={link.name}>
                      <a href={link.href} className="footer__link">{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} PHASE ROBOTICS
          </p>
          <p className="footer__egg">THE LOGO IS FIVE LIVE CELLS ▚ b3/s23</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
