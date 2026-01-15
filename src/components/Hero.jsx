import HeroAnimation from './HeroAnimation'
import './Hero.css'

function Hero() {
  const scrollToProducts = (e) => {
    e.preventDefault()
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" id="home">
      <div className="hero__content">
        <div className="hero__left">
          <h1 className="hero__title">
            Dynamiq Electronics
          </h1>
          <p className="hero__subtitle">
            Reimagining Robotics.
          </p>
          <div className="hero__actions">
            <a href="#products" className="hero__btn hero__btn--primary">
              Explore Products
            </a>
            <a href="#about" className="hero__btn hero__btn--secondary">
              Learn More
            </a>
          </div>
        </div>
        
        <div className="hero__right">
          <span className="hero__statement-line">Advanced Robotics</span>
          <span className="hero__statement-line hero__statement-line--accent">Made Simple.</span>
          <button onClick={scrollToProducts} className="hero__scroll-btn">
            <span className="hero__scroll-btn-text">Discover Eclipse Drive</span>
            <span className="hero__scroll-btn-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </span>
          </button>
        </div>
      </div>
      
      <div className="hero__animation">
        <HeroAnimation />
      </div>
    </section>
  )
}

export default Hero
