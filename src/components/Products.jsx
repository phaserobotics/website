import ModelViewer from './ModelViewer'
import './Products.css'

const PRODUCTS = [
  {
    id: 'lunar',
    name: 'Lunar Drive',
    rev: 'V2.1',
    status: '● CURRENT',
    tagline:
      'A sensored FOC servo drive that turns any gimbal BLDC into a smart, daisy-chainable servo. Plug one board into USB and it bridges the whole CAN chain.',
    model: '/models/lunar-drive.glb',
    modelLabel: 'LUNAR_DRIVE_V2.1 — LIVE PCB EXPORT',
    specs: [
      { label: 'MCU', value: 'ESP32-S3' },
      { label: 'Encoder', value: 'AS5047P · 14-bit' },
      { label: 'Gate driver', value: 'DRV8316C' },
      { label: 'Modes', value: 'Position / Velocity / Torque' },
      { label: 'Bus', value: 'CAN 500k + USB→CAN bridge' },
      { label: 'Chain', value: 'Up to 63 nodes' },
    ],
    terminal: [
      '$ python',
      '>>> import lunardrive as ld',
      '>>> bus = ld.connect("COM26")',
      '>>> bus.node(2).position(1.57)',
      '#2 ok pos',
    ],
  },
  {
    id: 'phalanx',
    name: 'Phalanx Drive',
    rev: 'R1',
    status: '● IN DEVELOPMENT',
    tagline:
      'An integrated cycloidal servo actuator for dexterous joints: 11:1 reduction, true phase-current FOC, and FDCAN — all inside a Ø24 mm package built for robot hands.',
    model: '/models/phalanx-drive.glb',
    modelLabel: 'PHALANX_DRIVE_R1 — LIVE PCB EXPORT',
    image: {
      src: '/phalanx_exploded.png',
      alt: 'Exploded view of the Phalanx Drive cycloidal actuator',
      caption: 'EXPLODED VIEW — TWO-DISC CYCLOIDAL REDUCER',
    },
    specs: [
      { label: 'MCU', value: 'STM32G431 · 170 MHz' },
      { label: 'Gate driver', value: 'DRV8316C' },
      { label: 'Sensing', value: '3× phase current' },
      { label: 'Bus', value: 'FDCAN' },
      { label: 'Reduction', value: '11:1 cycloidal' },
      { label: 'Envelope', value: 'Ø24 × 32.5 mm' },
    ],
  },
]

function Products() {
  return (
    <section className="products" id="products">
      <div className="container">
        <div className="products__header" data-reveal>
          <span className="section-label">// 02 — PRODUCTS</span>
          <h2 className="section-title">The actuator family</h2>
          <p className="products__subtitle">
            One protocol, one bus, from fingertip to wrist. The 3D boards below are
            exported straight from our KiCad sources — drag them around.
          </p>
        </div>

        {PRODUCTS.map((product, index) => (
          <article
            key={product.id}
            className={`product ${index % 2 === 1 ? 'product--flipped' : ''}`}
            data-reveal
          >
            <div className="product__visual">
              <ModelViewer src={product.model} label={product.modelLabel} />
              {product.image && (
                <figure className="product__figure">
                  <img
                    src={product.image.src}
                    alt={product.image.alt}
                    loading="lazy"
                    className="product__figure-img"
                  />
                  <figcaption className="product__figure-caption">
                    {product.image.caption}
                  </figcaption>
                </figure>
              )}
            </div>

            <div className="product__details">
              <div className="product__title-row">
                <h3 className="product__name">
                  {product.name} <span className="product__rev">{product.rev}</span>
                </h3>
                <span className="product__status">{product.status}</span>
              </div>
              <p className="product__tagline">{product.tagline}</p>

              <dl className="product__specs">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="product__spec">
                    <dt>{spec.label}</dt>
                    <dd>{spec.value}</dd>
                  </div>
                ))}
              </dl>

              {product.terminal && (
                <pre className="product__terminal" aria-label="Python quick start">
                  {product.terminal.join('\n')}
                </pre>
              )}

              <a href="mailto:phase.robotics@gmail.com" className="btn btn--primary product__cta">
                Request early access
              </a>
            </div>
          </article>
        ))}

        <article className="atlas" data-reveal>
          <div className="atlas__body">
            <span className="atlas__status">● RUNNING IN-HOUSE</span>
            <h3 className="atlas__name">Winder-1</h3>
            <p className="atlas__tagline">
              We also build the machines that make our actuators. Our motor
              winding machines are driven by the same drives they help produce.
            </p>
          </div>
          <div className="atlas__spec">
            <span className="atlas__number">100%</span>
            <span className="atlas__number-label">STATORS WOUND ON OUR OWN ACTUATORS</span>
          </div>
          <span className="atlas__cursor" aria-hidden="true">
            MACHINES MAKING MACHINES<span className="cursor-blink"></span>
          </span>
        </article>
      </div>
    </section>
  )
}

export default Products
