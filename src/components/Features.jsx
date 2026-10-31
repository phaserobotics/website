import PixelIcon from './PixelIcon'
import './Features.css'

const FEATURES = [
  {
    icon: 'terminal',
    title: 'Easy to use',
    description:
      'Unbox to closed-loop motion in five lines of Python. Tune and drive from a browser-based Control Studio — nothing to install.',
  },
  {
    icon: 'coin',
    title: 'Affordable',
    description:
      'Serious motion control at hobbyist prices. Off-the-shelf parts, open tooling, and no license fees.',
  },
  {
    icon: 'crosshair',
    title: 'Precise',
    description:
      '14-bit magnetic encoders and field-oriented control deliver smooth, exact position, velocity, and torque.',
  },
  {
    icon: 'blocks',
    title: 'Modular',
    description:
      'Every actuator is a node. Daisy-chain up to 63 on a single CAN bus — every joint of a hand, from one connector.',
  },
]

function Features() {
  return (
    <section className="features" id="why">
      <div className="container">
        <div className="features__header" data-reveal>
          <span className="section-label">// 01 — WHY PHASE</span>
          <h2 className="section-title">Motion, without the moat</h2>
          <p className="features__subtitle">
            A dexterous hand needs dozens of small, precise joints — and nobody
            sells those joints the way you'd want to buy them. So we build them,
            and the machines that make them.
          </p>
        </div>

        <div className="features__grid">
          {FEATURES.map((feature, index) => (
            <article
              key={feature.title}
              className="feature-card"
              data-reveal
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="feature-card__icon">
                <PixelIcon name={feature.icon} />
              </div>
              <h3 className="feature-card__title">{feature.title}</h3>
              <p className="feature-card__description">{feature.description}</p>
              <span className="feature-card__index">0{index + 1}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
