import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import './App.css';
import { Navbar, Footer } from './components/Layout';
import StatusBadge from './components/StatusBadge';
import Home from './pages/Home';
import { usePreloader, useScrollNav } from './hooks';
import { animateLoadingScreen, hideLoadingScreen } from './animations';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const Creations = React.lazy(() => import('./Creations'));
const Stories = React.lazy(() => import('./Stories'));
const SocialPage = React.lazy(() => import('./pages/Social/SocialPage'));
const MusicPage = React.lazy(() => import('./pages/Music'));
const Admin = React.lazy(() => import('./Admin'));

function LoadingFallback() {
  return (
    <div className="loading-screen">
      <h1 className="loading-title">AlleRoDi</h1>
      <div className="loading-content">
        <div className="pixel-loader"></div>
        <p className="loading-text">Cargando...</p>
        <div className="progress-bar">
          <div className="progress"></div>
        </div>
      </div>
    </div>
  );
}

const App = () => {
  const loading = usePreloader();
  useScrollNav();

  useEffect(() => {
    if (loading) {
      animateLoadingScreen();
    }
  }, [loading]);

  useEffect(() => {
    if (!loading) {
      hideLoadingScreen();
      import('./animations').then(({ initAnimations }) => {
        initAnimations();
      });
    }
  }, [loading]);

  if (loading) {
    return <LoadingFallback />;
  }

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home statusBadge={<StatusBadge />} />} />
          <Route
            path="/creations"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <Creations />
              </Suspense>
            }
          />
          <Route
            path="/stories"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <Stories />
              </Suspense>
            }
          />
          <Route
            path="/social"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <SocialPage />
              </Suspense>
            }
          />
          <Route
            path="/music"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <MusicPage />
              </Suspense>
            }
          />
          <Route
            path="/admin"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <Admin />
              </Suspense>
            }
          />
      </Routes>
        <Footer />
    </div>
  </Router>
  );
};

export default App;
