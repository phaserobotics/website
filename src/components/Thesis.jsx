import './Thesis.css'

// The investor read: why this, why us. Three lines, no more.
const POINTS = [
  {
    title: 'The bottleneck',
    text: 'A dexterous hand needs dozens of small, precise joints. Nobody sells them the way you would want to buy them.',
  },
  {
    title: 'The product',
    text: 'One actuator family on one bus, from fingertip to wrist. Order it, bolt it on, command it.',
  },
  {
    title: 'The machine',
    text: 'We build the machines that build the actuators. Our winders run on our own drives.',
  },
]

function Thesis() {
  return (
    <section className="thesis" id="thesis">
      <div className="container">
        <span className="section-label" data-reveal>02 / Thesis</span>
        <h2 className="section-title thesis__title" data-reveal>
          Robots are made
          <br />
          of <em>joints.</em>
        </h2>

        <ol className="thesis__points">
          {POINTS.map((point, index) => (
            <li
              key={point.title}
              className="thesis__point"
              data-reveal
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <span className="thesis__point-index">0{index + 1}</span>
              <h3 className="thesis__point-title">{point.title}</h3>
              <p className="thesis__point-text">{point.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Thesis
