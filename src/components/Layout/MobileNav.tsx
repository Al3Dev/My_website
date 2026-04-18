import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface MobileNavProps {
  onOpenChat: () => void;
}

const MobileNav = ({ onOpenChat }: MobileNavProps) => {
  const { pathname } = useLocation();

  const navClass = (path: string) =>
    `nav-button${pathname === path ? ' active' : ''}`;

  return (
    <div className="mobile-nav">
      <div className="nav-buttons">
        <Link to="/" className={navClass('/')}>
          <i className="fas fa-home"></i>
          <div className="nav-indicator"></div>
        </Link>
        <Link to="/stories" className={navClass('/stories')}>
          <i className="fas fa-book-open"></i>
        </Link>
        <Link to="/creations" className={navClass('/creations')}>
          <i className="fas fa-camera"></i>
        </Link>
        <button type="button" className="nav-button chat-button" onClick={onOpenChat}>
          <i className="fas fa-comments"></i>
        </button>
      </div>
    </div>
  );
};

export default MobileNav;
