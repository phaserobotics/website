import './Lineup.css'

// Stealth-mode manifest: the actuators, one line each, nothing more
const ITEMS = [
  {
    name: 'Lunar Drive',
    status: '● IN THE LAB',
    blurb:
      'A sensored FOC servo drive that turns any gimbal BLDC into a smart, daisy-chainable servo. USB in, 63-node CAN chain out.',
    image: {
      src: '/lunar-drive-motor.jpg',
      alt: 'Lunar Drive V2.1 board mounted on a BLDC motor, next to a bare stator',
    },
  },
  {
    name: 'Phalanx Drive',
    status: '● TAKING SHAPE',
    blurb:
      'An integrated cycloidal actuator for dexterous joints — 11:1 reduction, phase-current FOC, FDCAN, inside Ø37 × 32.5 mm.',
    image: {
      src: '/phalanx-drive-board.webp',
      alt: 'Phalanx Drive circular PCB',
    },
  },
  {
    name: 'Winding Machines',
    status: '● RUNNING IN-HOUSE',
    blurb:
      'The machines that make our actuators. Our motor winding machines are driven by the same drives they produce.',
    image: {
      src: '/winding-machine.webp',
      alt: 'Render of the Phase Robotics motor winding machine',
    },
  },
]

function Lineup() {
  return (
    <section className="lineup" id="lineup">
      <div className="container">
        <span className="section-label" data-reveal>// THE LINEUP</span>

        <div className="lineup__rows">
          {ITEMS.map((item) => (
            <article key={item.name} className="lineup__row" data-reveal>
              <div className="lineup__thumb">
                {item.image && (
                  <img src={item.image.src} alt={item.image.alt} loading="lazy" />
                )}
              </div>
              <h2 className="lineup__name">{item.name}</h2>
              <p className="lineup__blurb">{item.blurb}</p>
              <span className="lineup__status">{item.status}</span>
            </article>
          ))}
        </div>

        <p className="lineup__soon" data-reveal>
          LAUNCHING SOON<span className="cursor-blink" aria-hidden="true"></span>
        </p>
      </div>
    </section>
  )
}

export default Lineup
