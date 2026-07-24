import GameOfLife from './GameOfLife'
import './Hero.css'

function Hero() {
  return (
    <section className="hero" id="home">
      <GameOfLife className="hero__life" interactive cellSize={15} />

      <div className="hero__content">
        <span className="hero__kicker">// ROBOTIC ACTUATORS · MODULAR BY DESIGN</span>
        <h1 className="hero__title">
          Precise motion for
          <br />
          any robot you can imagine
          <span className="cursor-blink" aria-hidden="true"></span>
        </h1>
        <p className="hero__subtitle">
          Phase Robotics builds easy-to-use, affordable robotic actuators —
          closed-loop precision that snaps together like building blocks,
          from a single joint to a full machine.
        </p>
        <div className="hero__actions">
          <a href="#products" className="btn btn--primary">Explore products</a>
          <a href="#why" className="btn">Why Phase</a>
        </div>
        <div className="hero__stats">
          <span>3 CONTROL MODES</span>
          <span>63 NODES / BUS</span>
          <span>14-BIT FEEDBACK</span>
        </div>
      </div>

      <span className="hero__hint">▚ CLICK THE GRID — IT'S ALIVE (CONWAY, 1970)</span>
      <span className="hero__scroll">SCROLL ▼</span>
    </section>
  )
}

export default Hero
