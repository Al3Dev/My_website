import React, { useState, useEffect } from 'react';

const CommerceSection = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section
      id="store-project"
      style={{
        padding: isMobile ? '2.5rem 1rem' : '3rem 2rem',
        background: 'linear-gradient(135deg, #1a0f3c 0%, #2d1b69 50%, #4a2b8a 100%)',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
          animation: 'pulse 8s ease-in-out infinite alternate',
        }}
      />

      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          gap: isMobile ? '2rem' : '3rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            flex: '1',
            maxWidth: isMobile ? '160px' : '220px',
            margin: '0 auto',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: isMobile ? -8 : -12,
              left: isMobile ? -8 : -12,
              right: isMobile ? -8 : -12,
              bottom: isMobile ? -8 : -12,
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: isMobile ? '18px' : '22px',
              filter: 'blur(20px)',
              animation: 'glow 3s ease-in-out infinite alternate',
            }}
          />
          <img
            src="/assets/mech.png"
            alt="Plataforma de Comercio Digital"
            style={{
              width: '100%',
              height: 'auto',
              transition: 'transform 0.3s ease',
              filter: 'brightness(0) invert(1) drop-shadow(0 0 20px rgba(255, 255, 255, 0.2))',
              position: 'relative',
              zIndex: 1,
              borderRadius: '12px',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          />
        </div>

        <div
          style={{
            flex: '1.2',
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? '1.2rem' : '1.5rem',
            width: '100%',
            textAlign: isMobile ? 'center' : 'left',
          }}
        >
          <div>
            <h2
              style={{
                fontSize: isMobile ? '1.8rem' : '2.4rem',
                marginBottom: isMobile ? '1rem' : '1.3rem',
                color: '#fff',
                textAlign: isMobile ? 'center' : 'left',
                fontWeight: '700',
                letterSpacing: '-0.5px',
                textShadow: '0 0 20px rgba(255, 255, 255, 0.4)',
                fontFamily: "'Inter', 'Segoe UI', sans-serif",
              }}
            >
              Plataforma de Comercio Digital
            </h2>

            <p
              style={{
                fontSize: isMobile ? '0.95rem' : '1.1rem',
                lineHeight: isMobile ? '1.6' : '1.7',
                color: '#fff',
                marginBottom: isMobile ? '1.5rem' : '2rem',
                textAlign: isMobile ? 'center' : 'left',
                fontWeight: '400',
                opacity: 0.95,
                padding: isMobile ? '0 0.5rem' : '0',
                fontFamily: "'Inter', 'Segoe UI', sans-serif",
              }}
            >
              Solución integral de e-commerce que transforma la experiencia de compra online.
              Tecnología de vanguardia con interfaz intuitiva que conecta vendedores y compradores de
              manera eficiente, segura y escalable.
            </p>

            <div
              style={{
                display: 'flex',
                justifyContent: isMobile ? 'center' : 'flex-start',
              }}
            >
              <a
                href="https://www.instagram.com/mech_markett/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.7rem',
                  padding: isMobile ? '0.8rem 1.5rem' : '1rem 2rem',
                  background:
                    'linear-gradient(45deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  fontSize: isMobile ? '0.85rem' : '0.95rem',
                  fontWeight: '600',
                  backdropFilter: 'blur(15px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  fontFamily: "'Inter', 'Segoe UI', sans-serif",
                  letterSpacing: '0.3px',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.background =
                    'linear-gradient(45deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2))';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 255, 255, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background =
                    'linear-gradient(45deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <svg
                  width={isMobile ? '16' : '18'}
                  height={isMobile ? '16' : '18'}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                Síguenos en Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommerceSection;
