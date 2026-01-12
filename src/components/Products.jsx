import './Products.css'

function Products() {
  const specs = [
    { label: 'Voltage Range', value: '12-48V DC' },
    { label: 'Peak Current', value: '60A' },
    { label: 'Control Modes', value: 'FOC / Torque / Velocity' },
    { label: 'Communication', value: 'CAN / UART / SPI' },
    { label: 'Encoder Support', value: 'ABZ / Hall / SPI' },
    { label: 'Form Factor', value: '50×40×12mm' },
  ]

  return (
    <section className="products" id="products">
      <div className="products__container">
        <div className="products__header">
          <span className="products__label">// FLAGSHIP PRODUCT</span>
          <h2 className="products__title">Eclipse Drive</h2>
          <p className="products__subtitle">
            A high-performance BLDC motor driver designed for precision robotics. 
            Field-Oriented Control, compact form factor, and seamless integration.
          </p>
        </div>

        <div className="products__content">
          <div className="products__visual">
            <div className="products__image-container">
              <div className="products__image-placeholder">
                <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.5">
                  {/* PCB outline */}
                  <rect x="30" y="40" width="140" height="120" rx="4" />
                  
                  {/* Mounting holes */}
                  <circle cx="42" cy="52" r="4" />
                  <circle cx="158" cy="52" r="4" />
                  <circle cx="42" cy="148" r="4" />
                  <circle cx="158" cy="148" r="4" />
                  
                  {/* Main chip */}
                  <rect x="70" y="70" width="60" height="60" />
                  <text x="100" y="105" textAnchor="middle" fontSize="8" fill="currentColor">MCU</text>
                  
                  {/* MOSFETs */}
                  <rect x="40" y="75" width="20" height="50" strokeDasharray="2 1" />
                  <rect x="140" y="75" width="20" height="50" strokeDasharray="2 1" />
                  
                  {/* Connectors */}
                  <rect x="80" y="44" width="40" height="12" />
                  <rect x="80" y="144" width="40" height="12" />
                  
                  {/* Traces */}
                  <path d="M60 85 L70 85" strokeDasharray="1 1" />
                  <path d="M60 100 L70 100" strokeDasharray="1 1" />
                  <path d="M60 115 L70 115" strokeDasharray="1 1" />
                  <path d="M130 85 L140 85" strokeDasharray="1 1" />
                  <path d="M130 100 L140 100" strokeDasharray="1 1" />
                  <path d="M130 115 L140 115" strokeDasharray="1 1" />
                  
                  {/* Capacitors */}
                  <rect x="45" y="130" width="8" height="12" fill="currentColor" opacity="0.3" />
                  <rect x="147" y="130" width="8" height="12" fill="currentColor" opacity="0.3" />
                </svg>
              </div>
              <div className="products__image-label">
                <span>ECLIPSE_DRIVE_V2</span>
                <span className="products__status">● IN DEVELOPMENT</span>
              </div>
            </div>
          </div>

          <div className="products__details">
            <div className="products__specs">
              <h3 className="products__specs-title">Technical Specifications</h3>
              <dl className="products__specs-list">
                {specs.map((spec, index) => (
                  <div key={index} className="products__spec">
                    <dt className="products__spec-label">{spec.label}</dt>
                    <dd className="products__spec-value">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="products__cta">
              <a href="#contact" className="products__btn products__btn--primary">
                Request Early Access
              </a>
              <a href="#" className="products__btn products__btn--secondary">
                View Documentation →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Products


