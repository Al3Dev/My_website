import React from 'react';
import { FaGithub, FaLinkedin, FaSpotify } from 'react-icons/fa';
import { SiReact, SiFigma, SiVercel, SiLastfm } from 'react-icons/si';
import '../../App.css';

interface TechIcon {
  icon: React.ReactNode;
  name: string;
  url?: string;
}

const TechMarquee: React.FC = () => {
  const techIcons: TechIcon[] = [
    { icon: <FaGithub />, name: 'GitHub', url: 'https://github.com' },
    { icon: <FaLinkedin />, name: 'LinkedIn', url: 'https://linkedin.com' },
    { icon: <SiLastfm />, name: 'Last.fm', url: 'https://last.fm' },
    { icon: <SiReact />, name: 'React' },
    { icon: <SiFigma />, name: 'Figma' },
    { icon: <FaSpotify />, name: 'Spotify', url: 'https://spotify.com' },
    { icon: <SiVercel />, name: 'Vercel' },
  ];

  // Duplicamos el array para el efecto infinito sin cortes
  const duplicatedIcons = [...techIcons, ...techIcons];

  return (
    <div className="tech-marquee-container">
      <div className="tech-marquee-track">
        {duplicatedIcons.map((item, index) => (
          <div key={`${item.name}-${index}`} className="tech-marquee-item">
            {item.url ? (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="tech-marquee-link"
                aria-label={item.name}
              >
                {item.icon}
              </a>
            ) : (
              <div className="tech-marquee-icon" aria-label={item.name}>
                {item.icon}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechMarquee;
