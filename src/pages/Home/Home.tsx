import About from '../../About';
import DiscordSection from './sections/DiscordSection';
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
  onMusicReady: (ready: boolean) => void;
}

const Home = ({ statusBadge, onMusicReady }: HomeProps) => {
  const handleScrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <>
      <HeroSection
        onScrollDown={handleScrollDown}
        onMusicReady={onMusicReady}
        statusBadge={statusBadge}
      />

      <UpdatesSection />
      <New3DModelSection />
      <About />
      <GallerySection />
      <MusicSection />
      <DiscordSection />
      <CharacterSection />
      <GamePreviewSection />
      <ServicesSection />

    </>
  );
};

export default Home;
