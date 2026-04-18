import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import './SocialPage.css';

interface SocialLink {
  name: string;
  url: string;
  icon: string;
  description?: string;
}

const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/allerodi',
    icon: 'fab fa-github',
    description: 'Código y proyectos'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/allerodi',
    icon: 'fab fa-linkedin',
    description: 'Perfil profesional'
  },
  {
    name: 'Twitter / X',
    url: 'https://twitter.com/allerodi',
    icon: 'fab fa-twitter',
    description: 'Tweets y actualizaciones'
  },
  {
    name: 'Spotify',
    url: 'https://open.spotify.com/artist/2zU4sGIwSViMGRnwMSlD1j',
    icon: 'fab fa-spotify',
    description: 'Música y artistas'
  },
  {
    name: 'itch.io',
    url: 'https://allerodi.itch.io/',
    icon: 'fas fa-gamepad',
    description: 'Juegos y demos'
  }
];

const SocialPage = () => {
  return (
    <div className="social-page">
      <div
        className="social-container section-container"
        style={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <h1 className="social-title">AlleRoDi en redes</h1>
        <p className="social-subtitle">Encuéntrame en todas mis plataformas</p>

        <div className="social-grid">
          {socialLinks.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-card"
            >
              <i className={`${item.icon} social-card-icon`} />
              <span className="social-card-name">{item.name}</span>
              {item.description && (
                <span className="social-card-desc">{item.description}</span>
              )}
            </a>
          ))}
        </div>

        <Link to="/" className="social-back">
          <i className="fas fa-arrow-left" /> Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default SocialPage;
