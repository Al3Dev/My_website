import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="pixel-footer pro-footer">
    <div className="footer-container">
      <div className="footer-main">
        <div className="footer-col footer-contact">
          <h3 className="footer-title">Contacto</h3>
          <p className="footer-text">
            Email: <a href="mailto:allerodi.music@gmail.com">allerodi.music@gmail.com</a>
          </p>
          <div className="footer-social">
            <a
              href="https://github.com/allerodi"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/allerodi"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              href="https://twitter.com/allerodi"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://open.spotify.com/artist/2zU4sGIwSViMGRnwMSlD1j"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
            >
              <i className="fab fa-spotify"></i>
            </a>
          </div>
        </div>
        <div className="footer-col footer-newsletter">
          <h3 className="footer-title">Newsletter</h3>
          <form className="footer-form">
            <input type="email" placeholder="Tu email" className="footer-input" />
            <button type="submit" className="footer-btn">
              Suscribirse
            </button>
          </form>
          <p className="footer-text">Recibe novedades y lanzamientos de AlleRoDi.</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-copyright">
          &copy; 2024 AlleRoDi. Todos los derechos reservados. |{' '}
          <Link to="/admin" style={{ color: '#666', textDecoration: 'none', fontSize: '0.8rem' }}>
            Admin
          </Link>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
