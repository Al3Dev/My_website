import { FaDiscord } from 'react-icons/fa';
import './DiscordSection.css';

const configuredInvite = import.meta.env.VITE_DISCORD_INVITE_URL?.trim() ?? '';
const inviteUrl = /^https:\/\/(?:discord\.gg\/|discord\.com\/invite\/)[\w-]+\/?$/.test(configuredInvite)
  ? configuredInvite
  : 'https://discord.gg/puXfPCyZw7';

export default function DiscordSection() {
  return (
    <section id="discord" className="discord-section" aria-labelledby="discord-heading">
      <div className="discord-section__frame">
        <div className="discord-section__art" aria-hidden="true" />
        <div className="discord-section__content">
          <h2 id="discord-heading" className="section-title">AlleRoDI en Discord</h2>
          <p>
            Ven a platicar sobre música, videojuegos y desarrollo web. Comparte lo que
            estás creando y conoce a gente con los mismos intereses.
          </p>
          <a
            className="pixel-btn discord-section__join"
            href={inviteUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaDiscord aria-hidden="true" />
            Únete al servidor
          </a>
        </div>
      </div>
    </section>
  );
}
