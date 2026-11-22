import { Link } from 'react-router-dom';
import PortfolioPage, { PortfolioLink } from './PortfolioPage';
import cyberCat from './assets/CyberCat.png';

export default function Creations() {
  return (
    <PortfolioPage title="Creations" summary="Videojuegos, música electrónica y proyectos de software de AlleRoDi.">
      <section className="portfolio-catalog portfolio-highlight" aria-labelledby="creation-vote">
        <p className="portfolio-label">AstroHackathon · 2.º lugar</p>
        <h2 id="creation-vote">MiVotoSeguro</h2>
        <p>Prototipo de votación digital desarrollado en equipo sobre Internet Computer Protocol (ICP). En 48 horas construimos una demo funcional y la presentamos al jurado.</p>
        <Link className="portfolio-link" to="/stories#astrohackathon">Leer la historia <span aria-hidden="true">→</span></Link>
        <PortfolioLink href="https://github.com/VictorRojas3/icp-backend-starter">Ver repositorio del equipo</PortfolioLink>
      </section>
      <section className="portfolio-feature" aria-labelledby="creation-game">
        <video controls playsInline preload="none" poster="/assets/creations-game.webp" aria-label="Avance del videojuego de AlleRoDi">
          <source src="/assets/Mivideojuego.mp4" type="video/mp4" />
        </video>
        <div className="portfolio-body">
          <p className="portfolio-label">Videojuego en desarrollo</p>
          <h2 id="creation-game">Mi videojuego</h2>
          <p>Un proyecto que reúne música, arte digital y narrativa interactiva. Aquí puedes ver el avance y escuchar la música del tráiler.</p>
          <PortfolioLink href="https://www.youtube.com/watch?v=cN1zF62wHVU">Música del tráiler</PortfolioLink>
          <PortfolioLink href="https://allerodi.itch.io/">Perfil en itch.io</PortfolioLink>
        </div>
      </section>

      <div className="portfolio-grid">
        <section className="portfolio-card" aria-labelledby="creation-music">
          <img className="portfolio-art" src={cyberCat} alt="Ilustración de Cyber Cat" loading="lazy" />
          <div className="portfolio-body">
            <h2 id="creation-music">Música electrónica</h2>
            <p>De las seis pistas del EP <em>Missing Tracks</em> a las versiones nightcore y slowed &amp; reverb de <em>Cyber Cat</em>.</p>
            <PortfolioLink href="https://music.apple.com/us/artist/allerodi/1556014355">Discografía</PortfolioLink>
            <Link className="portfolio-link" to="/music">Historial en Last.fm <span aria-hidden="true">→</span></Link>
          </div>
        </section>
        <section className="portfolio-card portfolio-code-card" aria-labelledby="creation-code">
          <div className="portfolio-body">
            <p className="portfolio-label">Software</p>
            <h2 id="creation-code">MechMake</h2>
            <p>Una app multiplataforma en Flutter para crear y personalizar máquinas virtuales. El código de la app y la versión web está en GitHub.</p>
            <PortfolioLink href="https://github.com/Al3Dev/mechmake_app">App en Flutter</PortfolioLink>
            <PortfolioLink href="https://github.com/Al3Dev/MechMake">Proyecto web</PortfolioLink>
          </div>
        </section>
      </div>

      <section className="portfolio-catalog" aria-labelledby="creation-soundtracks">
        <h2 id="creation-soundtracks">Bandas sonoras y sencillos</h2>
        <PortfolioLink href="https://music.apple.com/us/album/flyout-original-game-soundtrack-single/1784439097">FlyOut · Banda sonora original</PortfolioLink>
        <PortfolioLink href="https://music.apple.com/us/album/hardstrike-arena-single/1787554979">Hardstrike Arena · Sencillo</PortfolioLink>
        <PortfolioLink href="https://open.spotify.com/artist/2zU4sGIwSViMGRnwMSlD1j">AlleRoDi en Spotify</PortfolioLink>
      </section>
    </PortfolioPage>
  );
}
