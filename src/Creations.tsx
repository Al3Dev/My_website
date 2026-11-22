import { useState } from 'react';
import { Link } from 'react-router-dom';
import PortfolioPage, { PortfolioLink } from './PortfolioPage';
import cyberCat from './assets/CyberCat.png';

const projects = [
  { id: 'fly-out', title: 'Fly Out', category: 'Videojuego en desarrollo', art: '/assets/fly-out-title.png',
    description: 'Elige una isla y despega en esta aventura de vuelo en pixel art.' },
  { id: 'cyber-cat', title: 'Cyber Cat', category: 'Música electrónica', art: cyberCat,
    description: 'Dos versiones de una misma pista: nightcore y slowed & reverb. Explora también las seis canciones del EP Missing Tracks.' },
  { id: 'mechmake', title: 'MechMake', category: 'Software', art: null,
    description: 'Una aplicación multiplataforma en Flutter para crear y personalizar máquinas virtuales.' },
  { id: 'soundtracks', title: 'Bandas sonoras', category: 'Música para videojuegos', art: '/assets/Albums.png',
    description: 'Escucha las tres piezas de Fly Out y el sencillo Hardstrike Arena.' },
] as const;

export default function Creations() {
  const [selected, setSelected] = useState(() => {
    const index = projects.findIndex(project => `#${project.id}` === window.location.hash);
    return Math.max(0, index);
  });
  const [playing, setPlaying] = useState(false);
  const project = projects[selected];

  function select(index: number) {
    setPlaying(false);
    setSelected((index + projects.length) % projects.length);
  }

  return (
    <PortfolioPage title="Creations">
      <section className="creation-gallery" aria-label="Galería de proyectos" aria-roledescription="carrusel">
        <div className="creation-toolbar">
          <div className="creation-picker" role="group" aria-label="Elegir proyecto">
            {projects.map((item, index) => (
              <button key={item.id} type="button" aria-pressed={selected === index} onClick={() => {
                if (selected !== index) select(index);
              }}>{item.title}</button>
            ))}
          </div>
          <div className="creation-arrows">
            <button type="button" aria-label="Proyecto anterior" onClick={() => select(selected - 1)}>‹</button>
            <button type="button" aria-label="Proyecto siguiente" onClick={() => select(selected + 1)}>›</button>
          </div>
        </div>
        <article id={project.id} className={`creation-project${playing ? ' creation-project--playing' : ''}`}>
          <div className={`creation-media creation-media--${project.id}`}>
            {playing ? <iframe src="/fly-out/index.html" title="Jugar Fly Out" allow="fullscreen; autoplay" /> :
              project.art ? <img key={project.art} src={project.art} alt={project.id === 'fly-out' ? 'Logo amarillo de Fly Out sobre un cielo azul de pixel art' : ''} /> :
              <span className="creation-wordmark" aria-hidden="true">MechMake</span>}
          </div>
          <div className="creation-details">
            <div aria-live="polite" aria-atomic="true">
              <p className="creation-category">{project.category}</p>
              <h2>{project.title}</h2>
            </div>
            <p>{project.description}</p>
            <div className="creation-actions">
              {project.id === 'fly-out' && <>
                <button type="button" className="portfolio-link portfolio-play" onClick={() => setPlaying(value => !value)}>
                  {playing ? 'Cerrar juego' : 'Jugar aquí'}
                </button>
                <PortfolioLink href="/fly-out/index.html">Abrir el juego</PortfolioLink>
              </>}
              {project.id === 'cyber-cat' && <>
                <PortfolioLink href="https://music.apple.com/us/artist/allerodi/1556014355">Discografía</PortfolioLink>
                <Link className="portfolio-link" to="/music">Historial en Last.fm</Link>
              </>}
              {project.id === 'mechmake' && <>
                <PortfolioLink href="https://github.com/Al3Dev/mechmake_app">App en Flutter</PortfolioLink>
                <PortfolioLink href="https://github.com/Al3Dev/MechMake">Proyecto web</PortfolioLink>
              </>}
              {project.id === 'soundtracks' && <>
                <PortfolioLink href="https://music.apple.com/us/album/flyout-original-game-soundtrack-single/1784439097">Fly Out</PortfolioLink>
                <PortfolioLink href="https://music.apple.com/us/album/hardstrike-arena-single/1787554979">Hardstrike Arena</PortfolioLink>
                <PortfolioLink href="https://open.spotify.com/artist/2zU4sGIwSViMGRnwMSlD1j">Spotify</PortfolioLink>
              </>}
            </div>
          </div>
        </article>
      </section>
    </PortfolioPage>
  );
}
