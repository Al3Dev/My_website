import React from 'react';
import './App.css';

const About: React.FC = () => {
  return (
    <div className="about-section">
      <div className="about-content">
        <div className="about-cards">
          <a href="https://open.spotify.com/artist/2zU4sGIwSViMGRnwMSlD1j" className="about-card" target="_blank" rel="noopener noreferrer">
            <div className="card-image" style={{ backgroundImage: "url('/assets/Albums.png')" }}></div>
            <div className="card-content">
              <div className="card-icon">
                <i className="fas fa-music"></i>
              </div>
              <h3>Música</h3>
              <p>Explora mi música en todas las plataformas digitales</p>
            </div>
          </a>

          <a href="https://youtube.com/@allerodi" className="about-card" target="_blank" rel="noopener noreferrer">
            <div className="card-image" style={{ backgroundImage: "url('/assets/StarPlus.jpg')" }}></div>
            <div className="card-content">
              <div className="card-icon">
                <i className="fas fa-video"></i>
              </div>
              <h3>Videos</h3>
              <p>Visualiza mis últimos videos y contenido</p>
            </div>
          </a>

          <a href="/creations" className="about-card">
            <div className="card-image" style={{ backgroundImage: "url('/assets/aledev.jpg')" }}></div>
            <div className="card-content">
              <div className="card-icon">
                <i className="fas fa-code"></i>
              </div>
              <h3>Proyectos</h3>
              <p>Descubre mis proyectos de desarrollo y diseño</p>
            </div>
          </a>

          <a href="https://instagram.com/allerodi" className="about-card" target="_blank" rel="noopener noreferrer">
            <div className="card-image" style={{ backgroundImage: "url('/assets/Me.png')" }}></div>
            <div className="card-content">
              <div className="card-icon">
                <i className="fas fa-user"></i>
              </div>
              <h3>Yo</h3>
              <p>Conoce más sobre mi trabajo y experiencia</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default About; 