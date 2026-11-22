import { NavLink } from 'react-router-dom';

const destinations = [
  { path: '/', label: 'Inicio', icon: 'fa-home' },
  { path: '/creations', label: 'Proyectos', icon: 'fa-folder-open' },
  { path: '/music', label: 'Música', icon: 'fa-headphones' },
  { path: '/social', label: 'Redes', icon: 'fa-users' },
];

export default function MobileNav({ onOpenChat }: { onOpenChat: () => void }) {
  return (
    <nav className="site-mobile-tabs" aria-label="Navegación móvil">
      <div className="site-mobile-tabs__items">
        {destinations.map(({ path, icon, label }) => (
          <NavLink key={path} to={path} end className="site-mobile-tabs__item">
            <i className={`fas ${icon}`} aria-hidden="true" />
            <span>{label}</span>
          </NavLink>
        ))}
        <button type="button" className="site-mobile-tabs__item" onClick={onOpenChat}>
          <i className="fas fa-comment-dots" aria-hidden="true" />
          <span>Chat</span>
        </button>
      </div>
    </nav>
  );
}
