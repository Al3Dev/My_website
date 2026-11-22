import React, { Suspense, useEffect, useLayoutEffect, useState } from 'react';
import { BrowserRouter as Router, Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import './App.css';
import { Navbar, Footer, MobileNav } from './components/Layout';
import ChatBot from './components/ChatBot';
import './MobileLayout.css';
import heroBackground from './assets/hero-background.webp';
import socialBackground from './assets/social-starlight.webp';
import portfolioBackground from './assets/portfolio-space.webp';
import StatusBadge from './components/StatusBadge';
import Home from './pages/Home';
import { usePreloader, useScrollNav } from './hooks';
import { initAnimations } from './animations';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const Creations = React.lazy(() => import('./Creations'));
const SocialPage = React.lazy(() => import('./pages/Social/SocialPage'));
const MusicPage = React.lazy(() => import('./pages/Music'));
const Admin = React.lazy(() => import('./Admin'));

function SiteNavigation() {
  const { pathname, hash } = useLocation();
  const [chatOpen, setChatOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useLayoutEffect(() => {
    if (!hash) window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return (
    <>
      <Navbar />
      <MobileNav onOpenChat={() => setChatOpen(true)} />
      <ChatBot chatOpen={chatOpen} setChatOpen={setChatOpen} isFullScreen={isFullScreen} setIsFullScreen={setIsFullScreen} />
    </>
  );
}

const homeResources = [heroBackground];
const musicResources = [heroBackground];
const creationsResources = [portfolioBackground, '/assets/fly-out-title.png'];
const socialResources = [socialBackground];

function LoadingScreen({ progress }: { progress?: number }) {
  return (
    <div className="site-loading">
      <p className="site-loading__name">AlleRoDi</p>
      <p className="site-loading__label" role="status">Cargando recursos…</p>
      <progress aria-label="Recursos de la página" max={100} value={progress} />
    </div>
  );
}

function PageResources({ images, contentReady = true, children }: {
  images: readonly string[];
  contentReady?: boolean;
  children: React.ReactNode;
}) {
  const { loading, progress } = usePreloader(images, contentReady);
  return (
    <>
      <div inert={loading} aria-busy={loading}>{children}</div>
      {loading && <LoadingScreen progress={progress} />}
    </>
  );
}

function HomeRoute() {
  const [musicReady, setMusicReady] = useState(false);
  useEffect(() => {
    const animations = gsap.context(initAnimations);
    return () => animations.revert();
  }, []);
  return (
    <PageResources images={homeResources} contentReady={musicReady}>
      <Home statusBadge={<StatusBadge />} onMusicReady={setMusicReady} />
    </PageResources>
  );
}

const App = () => {
  useScrollNav();
  return (
    <Router>
      <div className="app">
        <SiteNavigation />
        <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route
            path="/creations"
            element={
              <PageResources key="creations" images={creationsResources}>
                <Creations />
              </PageResources>
            }
          />
          <Route path="/stories" element={<Navigate to="/creations" replace />} />
          <Route
            path="/social"
            element={
              <PageResources key="social" images={socialResources}>
                <SocialPage />
              </PageResources>
            }
          />
          <Route
            path="/music"
            element={
              <PageResources key="music" images={musicResources}>
                <MusicPage />
              </PageResources>
            }
          />
          <Route
            path="/admin"
            element={<Admin />}
          />
        </Routes>
        </Suspense>
        <Footer />
    </div>
  </Router>
  );
};

export default App;
