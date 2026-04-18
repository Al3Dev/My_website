import React, { useState } from 'react';
import './App.css';
import ChatBot from './components/ChatBot';
import { MobileNav } from './components/Layout';

const Creations = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <>
      <div className="creations-page">
        <div
          className="creations-container section-container"
          style={{
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <h2 style={{ color: '#fff' }}>PRÓXIMAMENTE</h2>
          <p style={{ color: '#888' }}>Trabajando en nuevos proyectos.</p>
        </div>
      </div>

      <MobileNav onOpenChat={() => setChatOpen(true)} />
      <ChatBot
        chatOpen={chatOpen}
        setChatOpen={setChatOpen}
        isFullScreen={isFullScreen}
        setIsFullScreen={setIsFullScreen}
      />
    </>
  );
};

export default Creations;