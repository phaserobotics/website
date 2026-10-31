import './Ticker.css'

const ITEMS = [
  'DEXTEROUS MANIPULATION',
  'FIELD-ORIENTED CONTROL',
  'POSITION / VELOCITY / TORQUE',
  'CAN BUS · 63 NODES',
  '14-BIT MAGNETIC ENCODERS',
  '11:1 CYCLOIDAL REDUCTION',
  'WOUND ON OUR OWN MACHINES',
  'PYTHON IN FIVE LINES',
]

// Inverted mono strip that scrolls the spec sheet forever
function Ticker() {
  const strip = (ariaHidden) => (
    <div className="ticker__strip" aria-hidden={ariaHidden}>
      {ITEMS.map((item) => (
        <span key={item} className="ticker__item">
          {item}
          <span className="ticker__sep">■</span>
        </span>
      ))}
    </div>
  )

  return (
    <div className="ticker">
      <div className="ticker__track">
        {strip(false)}
        {strip(true)}
      </div>
    </div>
  )
}

export default Ticker
