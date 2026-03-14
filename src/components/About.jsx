import './About.css'

function About() {
  const values = [
    {
      number: '01',
      title: 'Accessibility',
      description: 'Making advanced robotics technology available to everyone, from hobbyists to professionals.'
    },
    {
      number: '02',
      title: 'Performance',
      description: 'No compromises on quality. Every product is engineered for reliability and precision.'
    },
    {
      number: '03',
      title: 'Community',
      description: 'Open-source philosophy with extensive documentation and developer support.'
    }
  ]

  return (
    <section className="about" id="about">
      <div className="about__container">
        <div className="about__grid">
          <div className="about__intro">
            <span className="about__label">// ABOUT US</span>
            <h2 className="about__title">
              Robotics for Everyone
            </h2>
            <p className="about__text">
              Phase Robotics was founded with a single mission: to make high-performance 
              robotics accessible. We believe that powerful motor control shouldn't require 
              a PhD or a massive budget.
            </p>
            <p className="about__text">
              Our team combines expertise in embedded systems, power electronics, and software 
              to create products that just work — out of the box, no compromises.
            </p>
          </div>

          <div className="about__values">
            {values.map((value, index) => (
              <div key={index} className="about__value">
                <span className="about__value-number">{value.number}</span>
                <div className="about__value-content">
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





