import './Footer.css'

function Footer() {
  const footerLinks = {
    products: [
      { name: 'Eclipse Drive', href: '#products' },
      { name: 'Documentation', href: '#' },
      { name: 'Pricing', href: '#' },
    ],
    company: [
      { name: 'About', href: '#about' },
      { name: 'Blog', href: '#' },
      { name: 'Careers', href: '#' },
    ],
    resources: [
      { name: 'GitHub', href: '#' },
      { name: 'Discord', href: '#' },
      { name: 'Support', href: '#contact' },
    ],
  }

  return (
    <footer className="footer" id="contact">
      <div className="footer__container">
        <div className="footer__main">
          <div className="footer__brand">
            <img src="/logo.png" alt="Phase Robotics" className="footer__logo" />
            <p className="footer__tagline">
              Powering the future of robotics, one line of code at a time.
            </p>
            <div className="footer__contact">
              <a href="mailto:phase.robotics@gmail.com" className="footer__email">
                phase.robotics@gmail.com
              </a>
            </div>
          </div>

          <div className="footer__links">
            <div className="footer__column">
              <h4 className="footer__column-title">Products</h4>
              <ul className="footer__list">
                {footerLinks.products.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="footer__link">{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer__column">
              <h4 className="footer__column-title">Company</h4>
              <ul className="footer__list">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="footer__link">{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer__column">
              <h4 className="footer__column-title">Resources</h4>
              <ul className="footer__list">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="footer__link">{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="footer__newsletter">
          <div className="footer__newsletter-content">
            <h3 className="footer__newsletter-title">Stay Updated</h3>
            <p className="footer__newsletter-text">
              Get notified about product launches and updates.
            </p>
          </div>
          <form className="footer__form" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="your@email.com" 
              className="footer__input"
              required
            />
            <button type="submit" className="footer__submit">
              Subscribe
            </button>
          </form>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} Phase Robotics. All rights reserved.
          </p>
          <div className="footer__legal">
            <a href="#" className="footer__legal-link">Privacy</a>
            <a href="#" className="footer__legal-link">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer





