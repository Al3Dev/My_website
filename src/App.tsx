import { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Creations from './Creations';
import About from './About';
import Stories from './Stories';
import Store from './Store';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [showGame, setShowGame] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const preloadResources = async () => {
      const imageUrls = [
        '/assets/character.png',
        '/assets/background.png',
        '/assets/star.png',
        '/assets/project1.png',
        '/assets/profile.png',
        '/assets/album-cover.png',
        // Añade aquí todas tus imágenes
      ];

      const loadImage = (url: string) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = url;
          img.onload = resolve;
          img.onerror = reject;
        });
      };

      try {
        await Promise.all(imageUrls.map(loadImage));
        setTimeout(() => setLoading(false), 3000); // Aumentamos el tiempo a 3 segundos
      } catch (error) {
        console.error('Error cargando recursos:', error);
        setLoading(false);
      }
    };

    preloadResources();

    // Añadimos el efecto de scroll para el navbar
    let prevScrollPos = window.pageYOffset;
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const navbar = document.querySelector<HTMLElement>('.navbar');
      if (navbar) {
        if (prevScrollPos > currentScrollPos) {
          navbar.style.top = '0';
        } else {
          navbar.style.top = '-100px';
        }
      }
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  // Componente ChatBot
  const ChatBot = () => {
    const [messages, setMessages] = useState([
      { from: "bot", text: "¡Hola! Soy Alejandro. Me gusta la música, crear cosas y la inteligencia artificial. ¿De qué quieres platicar?" }
    ]);
    const [input, setInput] = useState("");
    const [chatLoading, setChatLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    // System prompt oculto para el modelo
    const systemPrompt = "Responde siempre como Alejandro, de forma breve, amigable y tranquila. Usa frases cortas, como si chatearas por WhatsApp. No escribas textos largos ni formales. Sé natural y humano.";

    const sendMessage = async () => {
      if (!input.trim()) return;
      const userMsg = { from: "user", text: input };
      setMessages((msgs) => [...msgs, userMsg]);
      setInput("");
      setChatLoading(true);
      try {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
        // Inyecta el system prompt como el primer mensaje del historial
        const history = [
          { from: "system", text: systemPrompt },
          ...messages,
          userMsg
        ];
        const contents = history.map((m) => ({ role: m.from === "user" ? "user" : m.from === "system" ? "system" : "model", parts: [{ text: m.text }] }));
        const body = JSON.stringify({ contents });
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body
        });
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        const response = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
        setMessages((msgs) => [...msgs, { from: "bot", text: response }]);
      } catch (e) {
        setMessages((msgs) => [...msgs, { from: "bot", text: "Ocurrió un error. Intenta de nuevo." }]);
      }
      setChatLoading(false);
    };

    // Scroll automático al final del chat
    useEffect(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, chatOpen]);

    return (
      <>
        <button
          className="chatbot-fab desktop-only"
          onClick={() => setChatOpen((o) => !o)}
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 2000,
            borderRadius: "50%",
            width: 64,
            height: 64,
            background: "#202124",
            color: "#fff",
            border: "none",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            fontSize: 32,
            cursor: "pointer"
          }}
          aria-label="Abrir chat"
        >
          <i className="fas fa-comments"></i>
        </button>
        {chatOpen && (
          <div
            className="chatbot-window"
            style={{
              position: "fixed",
              bottom: 100,
              right: 24,
              width: 340,
              maxWidth: "90vw",
              height: 420,
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
              zIndex: 2100,
              display: "flex",
              flexDirection: "column"
            }}
          >
            <div style={{ padding: 16, borderBottom: "1px solid #eee", background: "#202124", color: "#fff", borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
              <b>ChatBot Gemini</b>
              <button onClick={() => setChatOpen(false)} style={{ float: "right", background: "none", border: "none", color: "#fff", fontSize: 20, cursor: "pointer" }}>×</button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: 16, background: "#f7f7f7" }}>
              {messages.map((msg, i) => (
                <div key={i} style={{
                  marginBottom: 12,
                  textAlign: msg.from === "user" ? "right" : "left"
                }}>
                  <span style={{
                    display: "inline-block",
                    background: msg.from === "user" ? "#202124" : "#e0e0e0",
                    color: msg.from === "user" ? "#fff" : "#222",
                    borderRadius: 12,
                    padding: "8px 14px",
                    maxWidth: "80%",
                    wordBreak: "break-word"
                  }}>{msg.text}</span>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <form
              onSubmit={e => { e.preventDefault(); sendMessage(); }}
              style={{ display: "flex", borderTop: "1px solid #eee", padding: 8, background: "#fff", borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}
            >
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Escribe tu pregunta..."
                style={{ flex: 1, border: "none", outline: "none", padding: 10, borderRadius: 8, fontSize: 16 }}
                disabled={chatLoading}
              />
              <button
                type="submit"
                style={{ marginLeft: 8, background: "#202124", color: "#fff", border: "none", borderRadius: 8, padding: "0 18px", fontSize: 16, cursor: chatLoading ? "not-allowed" : "pointer" }}
                disabled={chatLoading}
              >
                {chatLoading ? "..." : "Enviar"}
              </button>
            </form>
          </div>
        )}
      </>
    );
  };

  // Define a type for bullets
  interface Bullet {
    x: number;
    y: number;
  }

  // Mini-game component
  const MiniGame = () => {
    const [playerPosition, setPlayerPosition] = useState<number>(50); // Player starts in the middle
    const [bullets, setBullets] = useState<Bullet[]>([] as Bullet[]);
    const [gameOver, setGameOver] = useState<boolean>(false);

    useEffect(() => {
      console.log('MiniGame component mounted');
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
          setPlayerPosition((prev) => Math.max(prev - 5, 0));
        } else if (e.key === 'ArrowRight') {
          setPlayerPosition((prev) => Math.min(prev + 5, 100));
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, []);

    useEffect(() => {
      console.log('Bullets updated:', bullets);
      const interval = setInterval(() => {
        setBullets((prevBullets) => {
          const newBullets = prevBullets.map((bullet) => ({ ...bullet, y: bullet.y + 5 }));
          if (newBullets.some((bullet) => bullet.y > 90 && Math.abs(bullet.x - playerPosition) < 5)) {
            setGameOver(true);
            clearInterval(interval);
          }
          return newBullets.filter((bullet) => bullet.y <= 100);
        });
      }, 100);

      return () => clearInterval(interval);
    }, [playerPosition]);

    useEffect(() => {
      const interval = setInterval(() => {
        setBullets((prevBullets) => [...prevBullets, { x: Math.random() * 100, y: 0 }]);
      }, 1000);

      return () => clearInterval(interval);
    }, []);

    return (
      <div className="mini-game">
        {gameOver ? (
          <div className="game-over">Game Over</div>
        ) : (
          <>
            <div className="player" style={{ left: `${playerPosition}%` }}></div>
            {bullets.map((bullet, index) => (
              <div key={index} className="bullet" style={{ left: `${bullet.x}%`, top: `${bullet.y}%` }}></div>
            ))}
          </>
        )}
      </div>
    );
  };

  if (loading) {
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

  return (
    <Router>
      <div className="app">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top" role="navigation" aria-label="Navegación principal">
        <div className="container">
            <Link className="navbar-brand" to="/" aria-label="Ir a inicio">AlleRoDi</Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav" 
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                  <Link to="/" className="nav-link" aria-current="page">Home</Link>
              </li>
              <li className="nav-item">
                  <Link to="/creations" className="nav-link">Creations</Link>
              </li>
              <li className="nav-item">
                  <Link to="/stories" className="nav-link">Stories</Link>
              </li>
              <li className="nav-item">
                  <Link to="/store" className="nav-link cart-link" aria-label="Ir a la tienda">
                    <i className="fas fa-shopping-cart" aria-hidden="true"></i>
                  </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
        <Routes>
          <Route path="/" element={
            <>
      <div className="hero-section">
        <div className="stars-layer">
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
        </div>
        <div className="floating-name" style={{ marginTop: '35vh' }}>
          <div className="character-overlay"></div>
          <h1>AlleRoDi</h1>
          <div className="game-buttons">
            <button className="pixel-btn" onClick={() => setShowGame(true)}>
              <i className="fas fa-gamepad"></i>
              <span>Jugar</span>
            </button>
            <button className="pixel-btn" onClick={() => window.location.href='/creations'}>
              <i className="fas fa-play"></i>
              <span>Reproducir</span>
            </button>
            <Link to="/store" className="pixel-btn">
              <i className="fas fa-shopping-cart"></i>
              <span>Store</span>
            </Link>
          </div>
        </div>
        <div className="scroll-arrow" onClick={handleScrollDown}>
          <i className="fas fa-chevron-down"></i>
        </div>
      </div>

            {/* Botones de navegación móvil */}
            <div className="mobile-nav">
              <div className="nav-buttons">
                <Link to="/" className="nav-button active">
                  <i className="fas fa-home"></i>
                  <div className="nav-indicator"></div>
                </Link>
                <Link to="/stories" className="nav-button">
                  <i className="fas fa-book-open"></i>
                </Link>
                <Link to="/creations" className="nav-button">
                  <i className="fas fa-camera"></i>
                </Link>
                <Link to="/store" className="nav-button">
                  <i className="fas fa-shopping-cart"></i>
                </Link>
                <button className="nav-button chat-button" onClick={() => setChatOpen((o) => !o)}>
                  <i className="fas fa-comments"></i>
                </button>
        </div>
      </div>

      {/* Texto deslizante */}
      <div className="sliding-text-container">
  <div className="sliding-text">
    <span>Mi mente es tan creativa que vuela incluso de noche</span>
    <span>•</span>
    <span>A veces me pierdo, pero siempre me reinvento</span>
    <span>•</span>
    <span>El mundo puede ser duro, pero yo soy más fuerte</span>
    <span>•</span>
    <span>El arte es mi refugio</span>
    <span>•</span>
    <span>Coding is my healing</span>
    <span>•</span>
    <span>La música enciende mi alma</span>
    <span>•</span>
    <span>Mi mente nunca se apaga, siempre crea</span>
    <span>•</span>
    <span>Create to evolve</span>
    <span>•</span>
    <span>Debugging my dreams</span>
    <span>•</span>
    <span>Error 404: Giving up not found</span>
    <span>•</span>
    {/* Repite las frases para hacer la transición más suave */}
    <span>Mi mente es tan creativa que vuela incluso de noche</span>
    <span>•</span>
    <span>A veces me pierdo, pero siempre me reinvento</span>
    <span>•</span>
    <span>El mundo puede ser duro, pero yo soy más fuerte</span>
    <span>•</span>
  </div>
</div>

            {/* Nueva sección de Actualizaciones */}
            <section className="inspiration-section">
              <div className="inspiration-container">
                <div className="update-content">
                  <div className="update-image">
                    <img src="/assets/AloneInside.jpeg" alt="Próximo Lanzamiento" />
                  </div>
                  <div className="update-text">
                    <h2 className="update-title">Actualización</h2>
                    <p className="update-description">
                      Estamos trabajando en algo especial. Un nuevo proyecto que fusiona música, tecnología y arte digital. 
                      Una experiencia inmersiva que cambiará la forma en que interactúas con la música.
                    </p>
                    <div className="update-details">
                      <div className="update-detail">
                        <i className="fas fa-music"></i>
                        <span>Nuevo Álbum</span>
                </div>
                      <div className="update-detail">
                        <i className="fas fa-calendar"></i>
                        <span>Próximamente</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

            {/* Reemplazar la sección about existente con el nuevo componente */}
            <About />

            {/* Nueva sección de Galería */}
            <section className="gallery-section">
              <div className="gallery-container">
                <div className="video-container">
                  <iframe
                    src="https://www.youtube.com/embed/cN1zF62wHVU?si=Q_ZRD6cfaK-8ZMA9"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
              </div>
                <div className="gallery-content">
                  <h2 className="gallery-title">Galería de Creaciones</h2>
                  <p className="gallery-description">
                    Explora mi colección de trabajos digitales, donde cada pieza cuenta una historia única a través de la fusión de arte y tecnología.
                  </p>
                  <div className="gallery-grid">
                    <div className="gallery-item">
                      <div className="gallery-image" style={{ backgroundImage: "url('/assets/Life.jpeg')" }}></div>
                      <div className="gallery-item-title">AlleRoDI</div>
            </div>
                    <div className="gallery-item">
                      <div className="gallery-image" style={{ backgroundImage: "url('/assets/AloneInside.jpeg')" }}></div>
                      <div className="gallery-item-title">Proyecto 2</div>
              </div>
                    <div className="gallery-item">
                      <div className="gallery-image" style={{ backgroundImage: "url('/assets/Angry.jpeg')" }}></div>
                      <div className="gallery-item-title">Proyecto 3</div>
            </div>
                    <div className="gallery-item">
                      <div className="gallery-image" style={{ backgroundImage: "url('/assets/Fight.jpeg')" }}></div>
                      <div className="gallery-item-title">Proyecto 4</div>
              </div>
            </div>
                  <div className="gallery-more">
                    <a href="/creations" className="gallery-more-btn">
                      Ver más <i className="fas fa-arrow-right"></i>
                    </a>
              </div>
            </div>
              </div>
            </section>

            {/* Nueva sección de Música */}
            <section className="music-section">
              <div className="music-container">
                <div className="music-image">
                  <img src="/assets/Albums.png" alt="AlleRoDI Albums" />
              </div>
                <div className="music-content">
                  <h2 className="music-title">Mi Música</h2>
                  <p className="music-description">
                    Mi música está disponible en todas las plataformas digitales. 
                    Explora mis álbumes y singles en tu plataforma favorita.
                  </p>
                  <div className="music-buttons">
                    <a href="https://store.allerodi.com" target="_blank" rel="noopener noreferrer" className="pixel-btn">
                      <i className="fas fa-shopping-cart"></i>
                      <span>Comprar</span>
                    </a>
                    <a href="https://open.spotify.com/artist/2zU4sGIwSViMGRnwMSlD1j" target="_blank" rel="noopener noreferrer" className="pixel-btn">
                      <i className="fab fa-spotify"></i>
                      <span>Escuchar</span>
                    </a>
            </div>
          </div>
        </div>
      </section>

            {/* Nueva sección de Personaje */}
            <section className="character-section">
              <div className="character-container">
                <div className="character-image">
                  <img src="/assets/Personaje.jpeg" alt="Mi Personaje" />
            </div>
                <div className="character-content">
                  <h2 className="character-title">Este es mi Personaje</h2>
                  <p className="character-description">
                    Un ser digital que representa mi esencia creativa. Cada píxel cuenta una historia, 
                    cada movimiento refleja mi pasión por la música y la tecnología. Este personaje 
                    es la fusión perfecta entre mi amor por la programación y mi espíritu artístico.
                  </p>
          </div>
        </div>
      </section>

            {/* Nueva sección de Videojuego */}
            <section className="game-section">
              <div className="game-container">
                <div className="game-image">
                  <video 
                    controls
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ 
                      width: '100%', 
                      borderRadius: '20px', 
                      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                      maxHeight: '500px',
                      objectFit: 'cover'
                    }}
                  >
                    <source src="/assets/Mivideojuego.mp4" type="video/mp4" />
                    Tu navegador no soporta el elemento de video.
                  </video>
                </div>
                <div className="game-content">
                  <h2 className="game-title">Mi Videojuego</h2>
                  <p className="game-description">
                    Estoy trabajando en un emocionante proyecto de videojuego que combina música, 
                    arte digital y narrativa interactiva. Una experiencia única que te transportará 
                    a un mundo donde la música cobra vida y cada decisión cuenta.
                  </p>
                  <div className="game-details">
                    <div className="game-detail">
                      <i className="fas fa-gamepad"></i>
                      <span>Próximamente</span>
                    </div>
                    <div className="game-detail">
                      <i className="fas fa-code"></i>
                      <span>Desarrollo en Progreso</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Proyecto de Ventas */}
            <section id="store-project" style={{
              padding: window.innerWidth <= 768 ? '3rem 1.5rem' : '4rem 2rem',
              background: 'linear-gradient(135deg, #1a0f3c 0%, #2d1b69 50%, #4a2b8a 100%)',
              color: '#fff',
              position: 'relative',
              overflow: 'hidden',
              fontFamily: "'Poppins', sans-serif"
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
                animation: 'pulse 8s ease-in-out infinite',
                zIndex: 0
              }} />
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(45deg, rgba(74, 43, 138, 0.3) 0%, rgba(45, 27, 105, 0.3) 50%, rgba(26, 15, 60, 0.3) 100%)',
                zIndex: 0
              }} />
              <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
                alignItems: 'center',
                gap: window.innerWidth <= 768 ? '3rem' : '4rem',
                position: 'relative',
                zIndex: 1
              }}>
                <div style={{
                  flex: '1',
                  maxWidth: window.innerWidth <= 768 ? '220px' : '400px',
                  margin: '0 auto',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: window.innerWidth <= 768 ? '-15px' : '-20px',
                    left: window.innerWidth <= 768 ? '-15px' : '-20px',
                    right: window.innerWidth <= 768 ? '-15px' : '-20px',
                    bottom: window.innerWidth <= 768 ? '-15px' : '-20px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: window.innerWidth <= 768 ? '25px' : '30px',
                    filter: 'blur(30px)',
                    animation: 'glow 3s ease-in-out infinite alternate'
                  }} />
                  <img 
                    src="/assets/mech.png" 
                    alt="Proyecto de Ventas" 
                    style={{
                      width: '100%',
                      height: 'auto',
                      transition: 'transform 0.3s ease',
                      filter: 'brightness(0) invert(1) drop-shadow(0 0 30px rgba(255, 255, 255, 0.2))',
                      position: 'relative',
                      zIndex: 1
                    }} 
                  />
                </div>

                <div style={{
                  flex: '1.5',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: window.innerWidth <= 768 ? '2rem' : '2.5rem',
                  width: '100%'
                }}>
                  <div>
                    <h2 style={{
                      fontSize: window.innerWidth <= 768 ? '1.8rem' : '2.5rem',
                      marginBottom: window.innerWidth <= 768 ? '1rem' : '1.5rem',
                      color: '#fff',
                      textAlign: window.innerWidth <= 768 ? 'center' : 'left',
                      fontWeight: '600',
                      letterSpacing: '0.5px'
                    }}>
                      Proyectos de Ventas
                    </h2>
                    <p style={{
                      fontSize: window.innerWidth <= 768 ? '0.95rem' : '1.1rem',
                      lineHeight: window.innerWidth <= 768 ? '1.6' : '1.8',
                      color: '#fff',
                      marginBottom: window.innerWidth <= 768 ? '1.5rem' : '2rem',
                      textAlign: window.innerWidth <= 768 ? 'center' : 'left',
                      fontWeight: '300',
                      opacity: 0.9,
                      padding: window.innerWidth <= 768 ? '0 0.5rem' : '0'
                    }}>
                      Descubre nuestra tienda en línea donde la moda, tecnología y e-commerce se encuentran.
                      Síguenos en Instagram para ver nuestras últimas novedades y ofertas exclusivas.
                    </p>
                    <div style={{
                      display: 'flex',
                      justifyContent: window.innerWidth <= 768 ? 'center' : 'flex-start'
                    }}>
                      <a 
                        href="https://www.instagram.com/mech_markett/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.8rem',
                          padding: window.innerWidth <= 768 ? '0.8rem 1.5rem' : '1rem 2rem',
                          background: 'rgba(255, 255, 255, 0.1)',
                          color: '#fff',
                          textDecoration: 'none',
                          borderRadius: '12px',
                          transition: 'all 0.3s ease',
                          fontSize: window.innerWidth <= 768 ? '0.85rem' : '1rem',
                          fontWeight: '500',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          width: window.innerWidth <= 768 ? '100%' : 'auto',
                          justifyContent: 'center'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = 'translateY(-3px)';
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                        }}
                      >
                        <svg width={window.innerWidth <= 768 ? "18" : "20"} height={window.innerWidth <= 768 ? "18" : "20"} viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                        @mech_markett
                      </a>
                    </div>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(3, 1fr)',
                    gap: window.innerWidth <= 768 ? '1.5rem' : '2rem',
                    width: '100%'
                  }}>
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      padding: window.innerWidth <= 768 ? '1.5rem' : '2rem',
                      borderRadius: '20px',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    }}>
                      <div style={{
                        fontSize: window.innerWidth <= 768 ? '2rem' : '2.5rem',
                        marginBottom: window.innerWidth <= 768 ? '1rem' : '1.5rem',
                        color: '#fff',
                        textAlign: 'center'
                      }}>👗</div>
                      <h3 style={{
                        fontSize: window.innerWidth <= 768 ? '1.1rem' : '1.3rem',
                        marginBottom: window.innerWidth <= 768 ? '0.8rem' : '1rem',
                        color: '#fff',
                        textAlign: 'center',
                        fontWeight: '600'
                      }}>Moda</h3>
                      <p style={{
                        color: '#fff',
                        lineHeight: window.innerWidth <= 768 ? '1.6' : '1.8',
                        fontSize: window.innerWidth <= 768 ? '0.85rem' : '1rem',
                        textAlign: 'center',
                        fontWeight: '300',
                        opacity: 0.9
                      }}>
                        Descubre las últimas tendencias en moda y accesorios exclusivos.
                      </p>
                    </div>

                    <div style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      padding: window.innerWidth <= 768 ? '1.5rem' : '2rem',
                      borderRadius: '20px',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    }}>
                      <div style={{
                        fontSize: window.innerWidth <= 768 ? '2rem' : '2.5rem',
                        marginBottom: window.innerWidth <= 768 ? '1rem' : '1.5rem',
                        color: '#fff',
                        textAlign: 'center'
                      }}>💻</div>
                      <h3 style={{
                        fontSize: window.innerWidth <= 768 ? '1.1rem' : '1.3rem',
                        marginBottom: window.innerWidth <= 768 ? '0.8rem' : '1rem',
                        color: '#fff',
                        textAlign: 'center',
                        fontWeight: '600'
                      }}>Tecnología</h3>
                      <p style={{
                        color: '#fff',
                        lineHeight: window.innerWidth <= 768 ? '1.6' : '1.8',
                        fontSize: window.innerWidth <= 768 ? '0.85rem' : '1rem',
                        textAlign: 'center',
                        fontWeight: '300',
                        opacity: 0.9
                      }}>
                        Los mejores productos tecnológicos con garantía y soporte especializado.
                      </p>
                    </div>

                    <div style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      padding: window.innerWidth <= 768 ? '1.5rem' : '2rem',
                      borderRadius: '20px',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    }}>
                      <div style={{
                        fontSize: window.innerWidth <= 768 ? '2rem' : '2.5rem',
                        marginBottom: window.innerWidth <= 768 ? '1rem' : '1.5rem',
                        color: '#fff',
                        textAlign: 'center'
                      }}>🛍️</div>
                      <h3 style={{
                        fontSize: window.innerWidth <= 768 ? '1.1rem' : '1.3rem',
                        marginBottom: window.innerWidth <= 768 ? '0.8rem' : '1rem',
                        color: '#fff',
                        textAlign: 'center',
                        fontWeight: '600'
                      }}>E-commerce</h3>
                      <p style={{
                        color: '#fff',
                        lineHeight: window.innerWidth <= 768 ? '1.6' : '1.8',
                        fontSize: window.innerWidth <= 768 ? '0.85rem' : '1rem',
                        textAlign: 'center',
                        fontWeight: '300',
                        opacity: 0.9
                      }}>
                        Compra segura y envíos rápidos a todo el país.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Nueva sección Servicios - ahora con música de Spotify */}
            <section id="services" className="services-section artist-spotify-bg">
        <div className="container">
                <div className="artist-spotify-card">
                  <div className="artist-spotify-left">
                    <iframe
                      src="https://open.spotify.com/embed/artist/2zU4sGIwSViMGRnwMSlD1j?utm_source=generator"
                      width="100%"
                      height="380"
                      frameBorder="0"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      style={{ borderRadius: '16px', border: '3px solid #202124', minWidth: '220px', background: '#121212' }}
                      title="Spotify AlleRoDI"
                    ></iframe>
                </div>
                  <div className="artist-spotify-right">
                    <h3 className="artist-title">AlleRoDI</h3>
                    <p className="artist-bio">
                      Soy AlleRoDI, artista y creador digital apasionado por la música electrónica y la innovación. Mi sonido fusiona creatividad, tecnología y emociones, buscando siempre romper límites y conectar con quienes escuchan. ¡Dale play y acompáñame en este viaje musical!
                    </p>
                    <a href="https://open.spotify.com/artist/2zU4sGIwSViMGRnwMSlD1j" target="_blank" rel="noopener noreferrer" className="spotify-link">
                      Escúchame en Spotify
                    </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer mejorado */}
            <footer className="pixel-footer pro-footer">
              <div className="footer-container">
                <div className="footer-main">
                  <div className="footer-col footer-contact">
                    <h3 className="footer-title">Contacto</h3>
                    <p className="footer-text">Email: <a href="mailto:allerodi.music@gmail.com">allerodi.music@gmail.com</a></p>
                    <div className="footer-social">
                      <a href="https://github.com/allerodi" target="_blank" rel="noopener noreferrer" className="footer-social-link"><i className="fab fa-github"></i></a>
                      <a href="https://www.linkedin.com/in/allerodi" target="_blank" rel="noopener noreferrer" className="footer-social-link"><i className="fab fa-linkedin"></i></a>
                      <a href="https://twitter.com/allerodi" target="_blank" rel="noopener noreferrer" className="footer-social-link"><i className="fab fa-twitter"></i></a>
                      <a href="https://open.spotify.com/artist/2zU4sGIwSViMGRnwMSlD1j" target="_blank" rel="noopener noreferrer" className="footer-social-link"><i className="fab fa-spotify"></i></a>
              </div>
            </div>
                  <div className="footer-col footer-newsletter">
                    <h3 className="footer-title">Newsletter</h3>
                    <form className="footer-form">
                      <input type="email" placeholder="Tu email" className="footer-input" />
                      <button type="submit" className="footer-btn">Suscribirse</button>
              </form>
                    <p className="footer-text">Recibe novedades y lanzamientos de AlleRoDi.</p>
            </div>
          </div>
          <div className="footer-bottom">
                  <p className="footer-copyright">&copy; 2024 AlleRoDi. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
            <ChatBot />
            {/* Modal del juego */}
            {showGame && (
              <div className="game-modal-overlay" onClick={() => setShowGame(false)}>
                <div className="game-modal" onClick={e => e.stopPropagation()}>
                  <button className="game-modal-close" onClick={() => setShowGame(false)}>×</button>
                  <h2 className="game-modal-title">Mini Game</h2>
                  <MiniGame />
                </div>
    </div>
            )}
          </>
        } />
        <Route path="/creations" element={<Creations />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/store" element={<Store />} />
      </Routes>
    </div>
  </Router>
  );
};

export default App;
