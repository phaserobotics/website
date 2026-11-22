import GameOfLife from './GameOfLife'
import PhalanxMockup from './PhalanxMockup'
import './Hero.css'

// Headline numbers, all from the product specs below
const STATS = [
  { value: 'Ø24', unit: 'mm', label: 'Actuator envelope' },
  { value: '11:1', unit: '', label: 'Cycloidal reduction' },
  { value: '63', unit: 'nodes', label: 'On one CAN chain' },
  { value: '14', unit: 'bit', label: 'Magnetic encoder' },
]

function Hero() {
  return (
    <section className="hero" id="home">
      <GameOfLife className="hero__life" interactive cellSize={16} color="#dfe3da" />

      <div className="hero__content">
        <div className="hero__copy">
          <span className="section-label">Precision actuators / Pre-launch</span>
          <h1 className="hero__title">
            Precise motion, sized for <em>robot hands.</em>
          </h1>
          <p className="hero__subtitle">
            Small actuators for dexterous robots, and the machines that make
            them.
          </p>
          <div className="hero__actions">
            <a href="#products" className="btn btn--primary cut">
              See the products <span className="btn__arrow" aria-hidden="true">→</span>
            </a>
            <a href="#thesis" className="btn cut">
              For investors <span className="btn__arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <div className="hero__visual">
          <PhalanxMockup />
        </div>
      </div>

      <dl className="hero__stats">
        {STATS.map((stat) => (
          <div key={stat.label} className="hero__stat">
            <dd className="hero__stat-value">
              {stat.value}
              {stat.unit && <span className="hero__stat-unit">{stat.unit}</span>}
            </dd>
            <dt className="hero__stat-label">{stat.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  )
}

export default Hero
