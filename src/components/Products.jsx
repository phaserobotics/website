import './Products.css'

const EMAIL = 'phase.robotics@gmail.com'

const PRODUCTS = [
  {
    id: 'lunar',
    name: 'Lunar Drive',
    kind: 'FOC servo drive',
    status: 'In the lab',
    blurb: 'Turns any gimbal BLDC into a smart, daisy-chainable servo.',
    specs: [
      { label: 'Control', value: 'Sensored FOC' },
      { label: 'Encoder', value: '14-bit magnetic' },
      { label: 'Bus', value: 'USB in, CAN out' },
      { label: 'Chain', value: '63 nodes' },
    ],
    image: {
      src: '/lunar-drive-motor.jpg',
      alt: 'Lunar Drive V2.1 FOC servo drive board mounted on a brushless BLDC motor, next to a bare motor stator',
    },
  },
  {
    id: 'phalanx',
    name: 'Phalanx Drive',
    kind: 'Integrated cycloidal actuator',
    status: 'Taking shape',
    blurb: 'Drive, motor and gearing in one package, built for dexterous joints.',
    specs: [
      { label: 'Reduction', value: '11:1 cycloidal' },
      { label: 'Envelope', value: 'Ø24 × 32.5 mm' },
      { label: 'Control', value: 'Phase-current FOC' },
      { label: 'Bus', value: 'FDCAN' },
    ],
    image: {
      src: '/phalanx-drive-board.webp',
      alt: 'Phalanx Drive circular PCB, the motor controller for a cycloidal robotic actuator',
    },
  },
  {
    id: 'winder',
    name: 'Winder-1',
    kind: 'Motor winding machine',
    status: 'Running in-house',
    blurb: 'The machine that makes our actuators, driven by the drives it produces.',
    specs: [
      { label: 'Job', value: 'BLDC stator winding' },
      { label: 'Motion', value: 'Phase drives' },
    ],
    image: {
      src: '/winding-machine.webp',
      alt: 'Render of the Winder-1 motor winding machine for brushless motor stators',
      dark: true,
    },
  },
]

function Products() {
  return (
    <section className="products" id="products">
      <div className="container">
        <header className="products__header" data-reveal>
          <span className="section-label">01 / Products</span>
          <h2 className="section-title">The lineup.</h2>
        </header>

        {PRODUCTS.map((product, index) => (
          <article key={product.id} className="product" data-reveal>
            <span className="product__index" aria-hidden="true">
              0{index + 1}
            </span>

            <figure
              className={`product__figure cut ${
                product.image.dark ? 'product__figure--dark' : ''
              }`}
            >
              <img src={product.image.src} alt={product.image.alt} loading="lazy" />
              <figcaption>FIG. 0{index + 1}</figcaption>
            </figure>

            <div className="product__body">
              <span className="tag">{product.status}</span>
              <h3 className="product__name">{product.name}</h3>
              <p className="product__kind">{product.kind}</p>
              <p className="product__blurb">{product.blurb}</p>

              <dl className="product__specs">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="product__spec">
                    <dt>{spec.label}</dt>
                    <dd>{spec.value}</dd>
                  </div>
                ))}
              </dl>

              <a
                href={`mailto:${EMAIL}?subject=${encodeURIComponent(
                  `Early access: ${product.name}`
                )}`}
                className="product__cta"
              >
                Request early access <span aria-hidden="true">→</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Products
