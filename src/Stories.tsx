import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PortfolioPage, { PortfolioLink } from './PortfolioPage';
import cyberCat from './assets/CyberCat.png';
import hackathonPhoto from './assets/astrohackathon.jpg';

export default function Stories() {
  const { hash } = useLocation();
  const hackathon = useRef<HTMLElement>(null);

  useEffect(() => {
    if (hash === '#astrohackathon') hackathon.current?.scrollIntoView();
  }, [hash]);

  return (
    <PortfolioPage title="Stories" summary="Una bitácora de lanzamientos, bandas sonoras y proyectos en desarrollo.">
      <article id="astrohackathon" ref={hackathon} className="portfolio-feature portfolio-highlight">
        <figure className="portfolio-event">
          <img className="portfolio-event-photo" src={hackathonPhoto} alt="Integrantes del equipo con sus reconocimientos" width={160} height={120} />
          <figcaption>Reconocimientos del equipo · Foto de LinkedIn</figcaption>
        </figure>
        <div className="portfolio-body">
          <p className="portfolio-label">AstroHackathon · Marzo de 2025</p>
          <h2>48 horas para construir MiVotoSeguro</h2>
          <p>En Guadalajara, lideré el desarrollo del prototipo con mi equipo. Usamos Internet Computer Protocol (ICP) para explorar cómo registrar y consultar votos en una aplicación descentralizada.</p>
          <p>Presentamos la demo ante el jurado y conseguimos el <strong>segundo lugar</strong> y un cupo en un programa de incubación.</p>
          <PortfolioLink href="https://mx.linkedin.com/in/robertomendezo/es">Publicación de un compañero</PortfolioLink>
          <PortfolioLink href="https://www.linkedin.com/in/alejandro-rodr%C3%ADguez-4a041518a/">Mi perfil en LinkedIn</PortfolioLink>
        </div>
      </article>
      <article className="portfolio-feature portfolio-story-cover">
        <img className="portfolio-art" src={cyberCat} alt="Ilustración de Cyber Cat" />
        <div className="portfolio-body">
          <p className="portfolio-label">Lanzamientos · 2026</p>
          <h2>Cyber Cat y Missing Tracks</h2>
          <p><em>Cyber Cat</em> explora dos extremos de velocidad: nightcore y slowed &amp; reverb. En agosto salió <em>Missing Tracks</em>, un EP de seis canciones que incluye <em>I Just Want to Dance</em> y <em>No Word</em>.</p>
          <PortfolioLink href="https://music.apple.com/us/artist/allerodi/1556014355">Explorar los lanzamientos</PortfolioLink>
        </div>
      </article>

      <div className="portfolio-timeline">
        <article className="portfolio-body">
          <p className="portfolio-label">Banda sonora · 2024</p>
          <h2>La música de FlyOut</h2>
          <p>La banda sonora original reúne <em>Happy Place</em>, <em>Flowers</em> y <em>Menu</em>. Son tres piezas en las que la música de AlleRoDi se cruza con los videojuegos.</p>
          <PortfolioLink href="https://music.apple.com/us/album/flyout-original-game-soundtrack-single/1784439097">Escuchar la banda sonora</PortfolioLink>
        </article>
        <article className="portfolio-body">
          <p className="portfolio-label">Video</p>
          <h2>La música del tráiler</h2>
          <p>En YouTube está el adelanto musical de un videojuego en desarrollo. El avance del juego se puede ver en Creations.</p>
          <PortfolioLink href="https://www.youtube.com/@Allerodi1">Canal de YouTube</PortfolioLink>
          <Link className="portfolio-link" to="/creations">Ver proyectos <span aria-hidden="true">→</span></Link>
        </article>
      </div>
    </PortfolioPage>
  );
}
