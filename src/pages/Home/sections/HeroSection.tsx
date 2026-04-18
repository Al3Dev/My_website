import React, { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { MobileNav } from '../../../components/Layout';
import SlidingText from './SlidingText';
import { LastFmWidget } from '../../../components/MusicPlayer';

interface HeroSectionProps {
  onScrollDown: () => void;
  onOpenChat: () => void;
  statusBadge?: ReactNode;
}

const HeroSection = ({ onScrollDown, onOpenChat, statusBadge }: HeroSectionProps) => (
  <>
    <div className="hero-section">
      <div className="stars-layer">
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
      </div>
      <div className="hero-split">
        <div className="hero-left">
          <div className="floating-name">
            <img
              className="character-img"
              src="/assets/character.png"
              alt=""
              aria-hidden="true"
            />
            <h1 className="hero-title">AlleRoDi</h1>
            <div className="game-buttons">
              <a
                href="https://allerodi.itch.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="pixel-btn"
              >
                <i className="fas fa-gamepad"></i>
                <span>Jugar</span>
              </a>
              <Link to="/creations" className="pixel-btn">
                <i className="fas fa-folder-open"></i>
                <span>Projects</span>
              </Link>
              <Link to="/social" className="pixel-btn">
                <i className="fas fa-share-alt"></i>
                <span>Social</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-glass-panel">
            <LastFmWidget />
          </div>
        </div>
      </div>
      <div className="scroll-arrow" onClick={onScrollDown}>
        <i className="fas fa-chevron-down"></i>
      </div>
      <SlidingText />
    </div>

    {statusBadge}

    <MobileNav onOpenChat={onOpenChat} />
  </>
);

export default HeroSection;
