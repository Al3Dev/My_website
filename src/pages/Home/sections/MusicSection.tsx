import React from 'react';

const MusicSection = () => (
  <section className="music-section">
    <div className="music-container">
      <div className="music-image">
        <img src="/assets/Albums.png" alt="AlleRoDI Albums" />
      </div>
      <div className="music-content">
        <h2 className="music-title">Mi Música</h2>
        <p className="music-description">
          Mi música está disponible en todas las plataformas digitales. Explora mis álbumes y
          singles en tu plataforma favorita.
        </p>
        <div className="music-buttons">
          <a
            href="https://store.allerodi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="pixel-btn"
          >
            <i className="fas fa-shopping-cart"></i>
            <span>Comprar</span>
          </a>
          <a
            href="https://open.spotify.com/artist/2zU4sGIwSViMGRnwMSlD1j"
            target="_blank"
            rel="noopener noreferrer"
            className="pixel-btn"
          >
            <i className="fab fa-spotify"></i>
            <span>Escuchar</span>
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default MusicSection;
