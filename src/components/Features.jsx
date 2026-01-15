import './Features.css'

function Features() {
  const features = [
    {
      icon: (
        <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="10" y="10" width="40" height="40" strokeDasharray="4 2" />
          <rect x="18" y="18" width="24" height="24" />
          <circle cx="30" cy="30" r="6" />
          <line x1="30" y1="10" x2="30" y2="18" />
          <line x1="30" y1="42" x2="30" y2="50" />
          <line x1="10" y1="30" x2="18" y2="30" />
          <line x1="42" y1="30" x2="50" y2="30" />
        </svg>
      ),
      title: 'Motor Control',
      emoji: '⚡',
      description: 'Advanced BLDC motor drivers with precise torque control and seamless integration for robotics applications.'
    },
    {
      icon: (
        <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polygon points="30,8 50,22 50,42 30,56 10,42 10,22" />
          <circle cx="30" cy="32" r="8" />
          <line x1="30" y1="8" x2="30" y2="24" strokeDasharray="2 2" />
          <circle cx="20" cy="16" r="2" fill="currentColor" />
          <circle cx="40" cy="16" r="2" fill="currentColor" />
          <text x="24" y="35" fontSize="8" fill="currentColor" fontFamily="monospace">IoT</text>
        </svg>
      ),
      title: 'Seamless Integration',
      emoji: '📡',
      description: 'Connect and monitor your robotics systems remotely with our embedded connectivity solutions.'
    },
    {
      icon: (
        <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="8" y="12" width="44" height="32" rx="2" />
          <line x1="8" y1="20" x2="52" y2="20" />
          <text x="16" y="32" fontSize="10" fill="currentColor" fontFamily="monospace">&lt;/&gt;</text>
          <rect x="36" y="26" width="10" height="12" strokeDasharray="2 2" />
        </svg>
      ),
      title: 'Open Source',
      emoji: '💻',
      description: 'Developer-friendly APIs and open-source tools to accelerate your robotics development workflow.'
    }
  ]

  return (
    <section className="features" id="services">
      <div className="features__container">
        <div className="features__header">
          <span className="features__label">// CAPABILITIES</span>
          <h2 className="features__title">Built for Builders</h2>
          <p className="features__subtitle">
            Everything you need to bring your robotics projects to life.
          </p>
        </div>
        
        <div className="features__grid">
          {features.map((feature, index) => (
            <article 
              key={index} 
              className="feature-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="feature-card__icon">
                {feature.icon}
              </div>
              <div className="feature-card__content">
                <h3 className="feature-card__title">
                  {feature.title} <span className="feature-card__emoji">{feature.emoji}</span>
                </h3>
                <p className="feature-card__description">
                  {feature.description}
                </p>
              </div>
              <div className="feature-card__corner"></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features





