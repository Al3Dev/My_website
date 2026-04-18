import React from 'react';

const CharacterSection = () => (
  <section className="character-section">
    <div className="character-container">
      <div className="character-image">
        <img src="/assets/Personaje.jpeg" alt="Mi Personaje" />
      </div>
      <div className="character-content">
        <h2 className="character-title">Este es mi Personaje</h2>
        <p className="character-description">
          Un ser digital que representa mi esencia creativa. Cada píxel cuenta una historia, cada
          movimiento refleja mi pasión por la música y la tecnología. Este personaje es la fusión
          perfecta entre mi amor por la programación y mi espíritu artístico.
        </p>
      </div>
    </div>
  </section>
);

export default CharacterSection;
