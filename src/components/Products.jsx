import './Products.css'

function Products() {
  const specs = [
    { label: 'Voltage Range', value: '12-30V DC' },
    { label: 'Peak Current', value: '15A' },
    { label: 'Control Modes', value: 'FOC / Torque / Velocity' },
    { label: 'Communication', value: 'CAN / SPI / I2C' },
    { label: 'Form Factor', value: '90 x 90 x 12mm' },
  ]

  return (
    <section className="products" id="products">
      <div className="products__container">
        <div className="products__header">
          <span className="products__label">// FLAGSHIP PRODUCT</span>
          <h2 className="products__title">Eclipse Drive V2</h2>
          <p className="products__subtitle">
            A high-performance BLDC motor driver designed for precision robotics. 
            Field-Oriented Control, compact form factor, and seamless integration.
          </p>
        </div>

        <div className="products__content">
          <div className="products__visual">
            <div className="products__image-container">
              <div className="products__image-wrapper">
                <img 
                  src="/BlackBackground.png" 
                  alt="Eclipse Drive V2 Motor Controller" 
                  className="products__image"
                />
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



