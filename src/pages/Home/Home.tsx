import React, { useState, useEffect } from 'react';
import About from '../../About';
import ChatBot from '../../components/ChatBot';
import type { ReactNode } from 'react';
import {
  HeroSection,
  UpdatesSection,
  New3DModelSection,
  GallerySection,
  MusicSection,
  CharacterSection,
  GamePreviewSection,
  ServicesSection,
} from './sections';

interface HomeProps {
  statusBadge?: ReactNode;
}

const Home = ({ statusBadge }: HomeProps) => {
  const [chatOpen, setChatOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleScrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <>
      <HeroSection
        onScrollDown={handleScrollDown}
        onOpenChat={() => setChatOpen(true)}
        statusBadge={statusBadge}
      />

      <UpdatesSection />
      <New3DModelSection />
      <About />
      <GallerySection />
      <MusicSection />
      <CharacterSection />
      <GamePreviewSection />
      <ServicesSection />

      <ChatBot
        chatOpen={chatOpen}
        setChatOpen={setChatOpen}
        isFullScreen={isFullScreen}
        setIsFullScreen={setIsFullScreen}
      />
    </>
  );
};

export default Home;
