import React from 'react';
import CyberCatImage from '../../../assets/CyberCat.png';

const UpdatesSection = () => (
  <section
    className="inspiration-section"
    style={{
      background: `linear-gradient(to right, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.6) 100%), url(${CyberCatImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}
  >
    <div className="inspiration-container">
      <div className="update-content">
        <div className="update-image">
          <img src={CyberCatImage} alt="Próximo Lanzamiento" />
        </div>
        <div className="update-text">
          <h2 className="update-title">Actualización</h2>
          <p className="update-description">
            Estamos trabajando en algo especial. Un nuevo proyecto que fusiona música, tecnología y
            arte digital. Una experiencia inmersiva que cambiará la forma en que interactúas con la
            música.
          </p>
          <div className="update-details">
            <div className="update-detail">
              <i className="fas fa-music"></i>
              <span>Nuevo Álbum</span>
            </div>
            <div className="update-detail">
              <i className="fas fa-calendar"></i>
              <span>Próximamente</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default UpdatesSection;
