import GameOfLife from './GameOfLife'
import GliderLogo from './GliderLogo'
import PhalanxMockup from './PhalanxMockup'
import './Hero.css'

function Hero() {
  return (
    <section className="hero" id="home">
      <GameOfLife className="hero__life" interactive cellSize={16} />

      <div className="hero__content">
        <div className="hero__copy">
          <span className="chip hero__kicker">
            PRECISION ACTUATORS · FOR DEXTEROUS ROBOTS
          </span>
          <h1 className="hero__title">
            <span className="hero__title-line">Precise motion,</span>
            <br />
            <span className="hero__title-line">
              sized for robot hands
              <span className="cursor-blink" aria-hidden="true"></span>
            </span>
          </h1>
          <p className="hero__subtitle">
            Phase Robotics builds small precision actuators for robot hands
            and dexterous manipulators — and the machines that make them,
            starting with motor winding machines driven by our own drives.
          </p>
          <div className="hero__launch">
            <span className="hero__launch-badge">
              LAUNCHING SOON<span className="cursor-blink" aria-hidden="true"></span>
            </span>
          </div>
        </div>

        <div className="hero__visual">
          <PhalanxMockup />
        </div>
      </div>

      <span className="chip hero__hint">
        <GliderLogo size={12} /> CLICK THE GRID — IT'S ALIVE (CONWAY, 1970)
      </span>
      <span className="chip hero__scroll">SCROLL ↓</span>
    </section>
  )
}

export default Hero
