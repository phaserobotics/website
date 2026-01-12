import HeroAnimation from './HeroAnimation'
import './Hero.css'

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero__header">
        <h1 className="hero__title">
          Dynamiq Electronics
        </h1>
        <p className="hero__subtitle">
          Advanced Robotics & Motor Control Solutions for the Modern World.
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
      
      <div className="hero__animation">
        <HeroAnimation />
      </div>
    </section>
  )
}

export default Hero
