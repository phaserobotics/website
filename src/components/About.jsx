import AsciiActuator from './AsciiActuator'
import './About.css'

const VALUES = [
  {
    number: '01',
    title: 'Accessible',
    description: 'Priced and documented for everyone — students, labs, and startups alike.',
  },
  {
    number: '02',
    title: 'Precise',
    description: 'Closed-loop FOC and real magnetic feedback in every unit, not just the datasheet.',
  },
  {
    number: '03',
    title: 'Open',
    description: 'Open protocols, Python tooling, and docs that respect your time.',
  },
]

function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about__grid">
          <div className="about__intro" data-reveal>
            <span className="section-label about__label">// 03 — ABOUT</span>
            <h2 className="section-title">Robots are made of joints</h2>
            <p className="about__text">
              Phase Robotics exists to make those joints boring — in the best way.
              An actuator should be something you order, bolt on, and command.
              Not a research project.
            </p>
            <p className="about__text">
              We combine embedded systems, power electronics, and open tooling into
              actuators that are precise enough for serious robots and affordable
              enough for everyone building one.
            </p>
            <AsciiActuator />
          </div>

          <div className="about__values" data-reveal>
            {VALUES.map((value) => (
              <div key={value.number} className="about__value">
                <span className="about__value-number">{value.number}</span>
                <div>
                  <h3 className="about__value-title">{value.title}</h3>
                  <p className="about__value-description">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
