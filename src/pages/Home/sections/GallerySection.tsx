import React from 'react';
import { Link } from 'react-router-dom';

const GallerySection = () => (
  <section className="gallery-section">
    <div className="gallery-container">
      <div className="video-container">
        <iframe
          src="https://www.youtube.com/embed/cN1zF62wHVU?si=Q_ZRD6cfaK-8ZMA9"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="gallery-content">
        <h2 className="gallery-title">Galería de Creaciones</h2>
        <p className="gallery-description">
          Explora mi colección de trabajos digitales, donde cada pieza cuenta una historia única a
          través de la fusión de arte y tecnología.
        </p>
        <div className="gallery-grid">
          <div className="gallery-item">
            <div className="gallery-image" style={{ backgroundImage: "url('/assets/Life.jpeg')" }}></div>
            <div className="gallery-item-title">AlleRoDI</div>
          </div>
          <div className="gallery-item">
            <div
              className="gallery-image"
              style={{ backgroundImage: "url('/assets/AloneInside.jpeg')" }}
            ></div>
            <div className="gallery-item-title">Proyecto 2</div>
          </div>
          <div className="gallery-item">
            <div className="gallery-image" style={{ backgroundImage: "url('/assets/Angry.jpeg')" }}></div>
            <div className="gallery-item-title">Proyecto 3</div>
          </div>
          <div className="gallery-item">
            <div className="gallery-image" style={{ backgroundImage: "url('/assets/Fight.jpeg')" }}></div>
            <div className="gallery-item-title">Proyecto 4</div>
          </div>
        </div>
        <div className="gallery-more">
          <Link to="/creations" className="gallery-more-btn">
            Ver más <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default GallerySection;
