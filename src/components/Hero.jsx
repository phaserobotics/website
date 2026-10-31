import GameOfLife from './GameOfLife'
import PhalanxMockup from './PhalanxMockup'
import './Hero.css'

function Hero() {
  return (
    <section className="hero" id="home">
      <GameOfLife className="hero__life" interactive cellSize={15} />

      <div className="hero__content">
        <div className="hero__copy">
        <span className="hero__kicker">// PRECISION ACTUATORS · FOR DEXTEROUS ROBOTS</span>
        <h1 className="hero__title">
          Precise motion,
          <br />
          sized for robot hands
          <span className="cursor-blink" aria-hidden="true"></span>
        </h1>
        <p className="hero__subtitle">
          Phase Robotics builds small precision actuators for robot hands
          and dexterous manipulators — and the machines that make them,
          starting with motor winding machines driven by our own drives.
        </p>
        <div className="hero__actions">
          <a href="#products" className="btn btn--primary">Explore products</a>
          <a href="#why" className="btn">Why Phase</a>
        </div>
        <div className="hero__stats">
          <span>Ø37 MM PACKAGE</span>
          <span>63 NODES / BUS</span>
          <span>14-BIT FEEDBACK</span>
        </div>
        </div>

        <div className="hero__visual">
          <PhalanxMockup />
        </div>
      </div>

      <span className="hero__hint">▚ CLICK THE GRID — IT'S ALIVE (CONWAY, 1970)</span>
      <span className="hero__scroll">SCROLL ▼</span>
    </section>
  )
}

export default Hero
