import './Contact.css'

const EMAIL = 'phase.robotics@gmail.com'

// Two doors: one for people who want the hardware, one for people who
// want to back it
const DOORS = [
  {
    id: 'build',
    label: 'For builders',
    title: 'Get the hardware.',
    text: 'Early units for labs and robot teams.',
    cta: 'Request early access',
    subject: 'Early access',
  },
  {
    id: 'invest',
    label: 'For investors',
    title: 'Back the build.',
    text: 'Where we are, and what comes next.',
    cta: 'Start a conversation',
    subject: 'Investor enquiry',
    accent: true,
  },
]

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="container">
        <span className="section-label" data-reveal>03 / Contact</span>

        <div className="contact__doors">
          {DOORS.map((door) => (
            <article
              key={door.id}
              className={`door cut ${door.accent ? 'door--accent' : ''}`}
              data-reveal
            >
              <span className="tag">{door.label}</span>
              <h2 className="door__title">{door.title}</h2>
              <p className="door__text">{door.text}</p>
              <a
                href={`mailto:${EMAIL}?subject=${encodeURIComponent(door.subject)}`}
                className={`btn cut ${door.accent ? 'btn--light' : 'btn--primary'}`}
              >
                {door.cta} <span className="btn__arrow" aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Contact
