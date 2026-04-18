import React from 'react';

interface ChatInviteOverlayProps {
  visible: boolean;
  isMobile: boolean;
  onChat: () => void;
  onDismiss: () => void;
}

const ChatInviteOverlay = ({ visible, isMobile, onChat, onDismiss }: ChatInviteOverlayProps) => {
  if (!visible) return null;

  return (
    <div
      className="chat-invite-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        animation: 'fadeIn 0.6s ease-in-out',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      <div
        className="chat-invite-content"
        style={{
          background: '#000',
          border: '2px solid #fff',
          borderRadius: '20px',
          padding: isMobile ? '40px 30px' : '60px 50px',
          maxWidth: isMobile ? '90vw' : '500px',
          width: '100%',
          textAlign: 'center',
          position: 'relative',
          boxShadow:
            '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          animation: 'scaleIn 0.5s ease-out 0.2s both',
        }}
      >
        <h2
          style={{
            fontSize: isMobile ? '2rem' : '2.5rem',
            marginBottom: '20px',
            fontWeight: 'bold',
            color: '#fff',
            fontFamily: "'Press Start 2P', cursive",
            letterSpacing: '2px',
            textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
            lineHeight: '1.2',
          }}
        >
          AlleRoDi
        </h2>

        <p
          style={{
            fontSize: isMobile ? '1rem' : '1.1rem',
            marginBottom: '40px',
            lineHeight: '1.6',
            color: '#fff',
            fontWeight: '300',
            letterSpacing: '0.5px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            opacity: 0.9,
            maxWidth: '400px',
            margin: '0 auto 40px auto',
          }}
        >
          ¿Te interesa la música, el diseño o la tecnología?
          <br />
          Chatea conmigo para conocer mis proyectos.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '15px' : '20px',
            maxWidth: '400px',
            margin: '0 auto',
          }}
        >
          <button
            onClick={onChat}
            style={{
              background: '#fff',
              color: '#000',
              border: '2px solid #fff',
              padding: isMobile ? '15px 20px' : '18px 25px',
              fontSize: isMobile ? '0.9rem' : '1rem',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '600',
              letterSpacing: '1px',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              fontFamily: "'Press Start 2P', cursive",
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#000';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.color = '#000';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <i className="fas fa-comments" style={{ marginRight: '8px' }}></i>
            Chatear
          </button>

          <button
            onClick={onDismiss}
            style={{
              background: 'transparent',
              color: '#fff',
              border: '2px solid #fff',
              padding: isMobile ? '15px 20px' : '18px 25px',
              fontSize: isMobile ? '0.9rem' : '1rem',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '600',
              letterSpacing: '1px',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              fontFamily: "'Press Start 2P', cursive",
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.color = '#000';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <i className="fas fa-times" style={{ marginRight: '8px' }}></i>
            Salir
          </button>
        </div>

        <p
          style={{
            fontSize: '0.75rem',
            marginTop: '30px',
            color: '#666',
            fontWeight: '300',
            letterSpacing: '1px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            opacity: 0.7,
          }}
        >
          Esta invitación desaparecerá en unos segundos
        </p>

        <div
          style={{
            position: 'absolute',
            top: '-2px',
            left: '-2px',
            right: '-2px',
            bottom: '-2px',
            background: 'linear-gradient(45deg, #fff, transparent, #fff)',
            borderRadius: '20px',
            zIndex: -1,
            opacity: 0.1,
            animation: 'glow 3s ease-in-out infinite alternate',
          }}
        />
      </div>
    </div>
  );
};

export default ChatInviteOverlay;
