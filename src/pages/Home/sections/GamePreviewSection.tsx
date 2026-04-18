import React from 'react';

const GamePreviewSection = () => (
  <section className="game-section">
    <div className="game-container">
      <div className="game-image">
        <video
          controls
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '100%',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            maxHeight: '500px',
            objectFit: 'cover',
          }}
        >
          <source src="/assets/Mivideojuego.mp4" type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      </div>
      <div className="game-content">
        <h2 className="game-title">Mi Videojuego</h2>
        <p className="game-description">
          Estoy trabajando en un emocionante proyecto de videojuego que combina música, arte
          digital y narrativa interactiva. Una experiencia única que te transportará a un mundo donde
          la música cobra vida y cada decisión cuenta.
        </p>
        <div className="game-details">
          <div className="game-detail">
            <i className="fas fa-gamepad"></i>
            <span>Próximamente</span>
          </div>
          <div className="game-detail">
            <i className="fas fa-code"></i>
            <span>Desarrollo en Progreso</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default GamePreviewSection;
