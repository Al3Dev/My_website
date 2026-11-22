import { Link } from 'react-router-dom';

const GamePreviewSection = () => (
  <section className="game-section">
    <div className="game-container">
      <div className="game-image">
        <video
          controls
          preload="none"
          poster="/assets/fly-out-title.png"
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
        <Link className="home-game-cover" to="/creations" aria-label="Ver Fly Out en Proyectos">
          <img src="/assets/fly-out-title.png" alt="" loading="lazy" />
        </Link>
      </div>
      <div className="game-content">
        <h2 className="game-title">Fly Out</h2>
        <p className="game-description">
          Elige una isla y despega en esta aventura de vuelo en pixel art, con música original de AlleRoDi.
        </p>
        <div className="game-details">
          <Link className="game-detail home-game-link" to="/creations">
            <i className="fas fa-gamepad" aria-hidden="true" />
            Jugar Fly Out
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default GamePreviewSection;
