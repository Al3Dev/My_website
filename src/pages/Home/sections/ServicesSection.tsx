import React from 'react';

const ServicesSection = () => (
  <section id="services" className="services-section artist-spotify-bg">
    <div className="container">
      <div className="artist-spotify-card">
        <div className="artist-spotify-left">
          <iframe
            src="https://open.spotify.com/embed/artist/2zU4sGIwSViMGRnwMSlD1j?utm_source=generator"
            width="100%"
            height="380"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            style={{
              borderRadius: '16px',
              border: '0',
              minWidth: '220px',
              background: '#121212',
            }}
            title="Spotify AlleRoDI"
          ></iframe>
        </div>
        <div className="artist-spotify-right">
          <h3 className="artist-title">AlleRoDI</h3>
          <p className="artist-bio">
            Soy AlleRoDI, artista y creador digital apasionado por la música electrónica y la
            innovación. Mi sonido fusiona creatividad, tecnología y emociones, buscando siempre
            romper límites y conectar con quienes escuchan. ¡Dale play y acompáñame en este viaje
            musical!
          </p>
          <a
            href="https://open.spotify.com/artist/2zU4sGIwSViMGRnwMSlD1j"
            target="_blank"
            rel="noopener noreferrer"
            className="spotify-link"
          >
            Escúchame en Spotify
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default ServicesSection;
