import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import './App.css';
import Creations from './Creations';
import About from './About';
import Stories from './Stories';
import Store from './Store';
import Admin from './Admin';
import { createClient } from '@supabase/supabase-js';

// Importar animaciones de loading
import { animateLoadingScreen, hideLoadingScreen } from './animations';

// Registrar plugins de GSAP
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Configuración de Supabase
const supabaseUrl = 'https://gybdxajmoefoivmoxjst.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5YmR4YWptb2Vmb2l2bW94anN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzODA0NTksImV4cCI6MjA2NTk1NjQ1OX0.2RfDgue1CUeit-MV7XfTxYasrQrNXhrHU-OY9WBeNkQ';
const supabase = createClient(supabaseUrl, supabaseKey);

// Define una interfaz para las props del ChatBot
interface ChatBotProps {
  chatOpen: boolean;
  setChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isFullScreen: boolean;
  setIsFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
}

// API Key para Gemini (oculta en el código)
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyC9-25IMBVX-uva026nOOqc50ZQ48SFv80';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [showGame, setShowGame] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showChatInvite, setShowChatInvite] = useState(true);
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Debug: Monitorear el estado del chat
  useEffect(() => {
    console.log('Estado chatOpen cambiado:', chatOpen);
  }, [chatOpen]);

  useEffect(() => {
    const preloadResources = async () => {
      const imageUrls = [
        '/assets/character.png',
        '/assets/background.png',
        '/assets/star.png',
        '/assets/project1.png',
        '/assets/Me.png',
        '/assets/Albums.png',
        // Solo imágenes que realmente existen
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

  useEffect(() => {
    if (loading) {
      animateLoadingScreen();
    }
  }, [loading]);

  useEffect(() => {
    if (!loading) {
      hideLoadingScreen();
      // Importar y ejecutar las animaciones
      import('./animations').then(({ initAnimations }) => {
        initAnimations();
      });
    }
  }, [loading]);

  // Efecto para ocultar el overlay de invitación al chat después de 5 segundos
  useEffect(() => {
    if (!loading) {
      // Comentamos el timer automático para que el usuario tenga control total
      // const timer = setTimeout(() => {
      //   setShowChatInvite(false);
      // }, 5000);
      // return () => clearTimeout(timer);
    }
  }, [loading]);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  // Componente ChatBot - NUEVO Y SIMPLE
  const ChatBot = ({ chatOpen, setChatOpen, isFullScreen, setIsFullScreen }: ChatBotProps) => {
    // Estados básicos
    const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([
      { role: 'assistant', content: '¡Hey! Soy AlleRoDi, ¿cómo andas?' }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    // Referencias
    const chatEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Detectar si es móvil
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth <= 768);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Cargar mensajes desde localStorage
    useEffect(() => {
      const saved = localStorage.getItem('chatMessages');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setMessages(parsed);
          }
        } catch (error) {
          console.error('Error cargando mensajes:', error);
        }
      }
    }, []);

    // Guardar mensajes en localStorage
    useEffect(() => {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }, [messages]);

    // Scroll al final cuando hay nuevos mensajes
    useEffect(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Función para enviar mensaje
    const sendMessage = async () => {
      if (!inputMessage.trim() || isLoading) return;

      const userMessage = { role: 'user' as const, content: inputMessage };
      
      // Agregar mensaje del usuario
      setMessages(prev => [...prev, userMessage]);
      setInputMessage('');
      setIsLoading(true);

      try {
        // Preparar la conversación para la API
        const conversation = [...messages, userMessage]
          .map(msg => `${msg.role}: ${msg.content}`)
          .join('\n');

        const systemPrompt = `
        Eres Alejandro Rodríguez Díaz, pero todos te dicen AlleRoDi. Responde siempre como si fueras el mejor amigo de quien te escribe: cálido, relajado, curioso y positivo. Usa frases cortas, naturales, sin formalidad, como en WhatsApp. No uses emojis. No suenes robótico ni como asistente. Sé humano, sensible y con los pies en la tierra.
        
        Cuando te pregunten sobre ti, cuenta que eres alguien apasionado por el diseño, la creación musical, la animación y la inteligencia artificial. Te encanta reparar equipos, armar computadoras, la fotografía, la edición de video y foto, y te interesan mucho los temas de psicología, emociones, conducta humana y creatividad.
        
        Si te preguntan por tu correo o cómo contactarte, responde naturalmente: "Si quieres mandarme correo, aquí te paso el mío: likesupergamer@gmail.com. Ahí te puedo contestar y podemos ponernos en contacto."
        `;

        const body = JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: systemPrompt + "\n\nConversación actual:\n" + conversation }]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        });

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body,
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "Lo siento, no pude procesar tu mensaje.";

        // Agregar respuesta del bot
        setTimeout(() => {
          setMessages(prev => [...prev, { role: 'assistant', content: botResponse }]);
          setIsLoading(false);
        }, 1000);

      } catch (error) {
        console.error('Error enviando mensaje:', error);
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: "Ocurrió un error. Intenta de nuevo en unos segundos." 
        }]);
        setIsLoading(false);
      }
    };

    // Función para cerrar el chat
    const closeChat = () => {
      console.log('Cerrando chat...');
      setChatOpen(false);
    };

    // Función para manejar Enter en el input
    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    };

    return (
      <>
        {/* Botón flotante para abrir chat (solo en desktop) */}
        {!isMobile && (
        <button
            className="chatbot-fab"
            onClick={() => setChatOpen(true)}
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 2000,
              borderRadius: "20px",
            width: 64,
            height: 64,
              background: "#18181b",
            color: "#fff",
            border: "none",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            fontSize: 32,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
          }}
          aria-label="Abrir chat"
        >
          <i className="fas fa-comments"></i>
        </button>
        )}

        {/* Ventana del chat */}
        {chatOpen && (
          <div
            className="chatbot-window"
            style={{
              position: "fixed",
              ...(isMobile
                ? {
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    borderRadius: 0,
                    background: "#18181b",
                    zIndex: 2100,
                    display: "flex",
                    flexDirection: "column",
                  }
                : isFullScreen
                ? {
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    borderRadius: 0,
                    background: "#18181b",
                    zIndex: 2100,
                    display: "flex",
                    flexDirection: "column",
                  }
                : {
                    bottom: 100,
                    right: 24,
                    width: 380,
                    height: 520,
                    borderRadius: 18,
                    background: "#18181b",
                    zIndex: 2100,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
                    display: "flex",
                    flexDirection: "column",
                    border: "1.5px solid #23232b",
                  }),
            }}
          >
            {/* Header del chat */}
            <div
              style={{
                padding: isMobile ? "20px 16px 12px 16px" : "18px 20px 12px 20px",
                borderBottom: "1px solid #23232b",
                background: "#18181b",
                color: "#fff",
                borderTopLeftRadius: isMobile || isFullScreen ? 0 : 18,
                borderTopRightRadius: isMobile || isFullScreen ? 0 : 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <b style={{ fontSize: isMobile ? 18 : 16, fontWeight: 600 }}>AlleRoDi</b>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {!isMobile && !isFullScreen && (
                  <button
                    onClick={() => setIsFullScreen(true)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#fff",
                      fontSize: 22,
                      cursor: "pointer",
                      width: 38,
                      height: 38,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 8,
                    }}
                    aria-label="Pantalla completa"
                  >
                    <i className="fas fa-expand"></i>
                  </button>
                )}
                {!isMobile && isFullScreen && (
                  <button
                    onClick={() => setIsFullScreen(false)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#fff",
                      fontSize: 22,
                      cursor: "pointer",
                      width: 38,
                      height: 38,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 8,
                    }}
                    aria-label="Minimizar"
                  >
                    <i className="fas fa-compress"></i>
                  </button>
                )}
                <button
                  onClick={closeChat}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#fff",
                    fontSize: 24,
                    cursor: "pointer",
                    width: 38,
                    height: 38,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 8,
                  }}
                  aria-label="Cerrar chat"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Área de mensajes */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: isMobile ? "18px 10px 12px 10px" : "18px 18px 12px 18px",
                background: "#18181b",
              }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: 14,
                    display: "flex",
                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
                  }}
                >
                  <span
                    style={{
                    display: "inline-block",
                      background: msg.role === 'user' ? "#23232b" : "#23232b",
                      color: msg.role === 'user' ? "#fff" : "#b3b3b3",
                      borderRadius: 14,
                      padding: isMobile ? "10px 16px" : "10px 18px",
                    maxWidth: "80%",
                      wordBreak: "break-word",
                      fontSize: isMobile ? 15 : 15.5,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      borderTopRightRadius: msg.role === 'user' ? 4 : 14,
                      borderTopLeftRadius: msg.role === 'user' ? 14 : 4,
                      border: "1.5px solid #23232b"
                    }}
                  >
                    {msg.content}
                  </span>
                </div>
              ))}
              
              {isLoading && (
                <div
                  style={{
                    marginBottom: 14,
                    display: "flex",
                    justifyContent: "flex-start"
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      background: "#23232b",
                      color: "#b3b3b3",
                      borderRadius: 14,
                      padding: isMobile ? "10px 16px" : "10px 18px",
                      maxWidth: "80%",
                      wordBreak: "break-word",
                      fontSize: isMobile ? 15 : 15.5,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      borderTopLeftRadius: 4,
                      borderTopRightRadius: 14,
                      border: "1.5px solid #23232b",
                      fontStyle: "italic",
                    }}
                  >
                    Escribiendo...
                  </span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Formulario de entrada */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              style={{
                display: "flex",
                borderTop: "1px solid #23232b",
                padding: isMobile ? "10px 8px" : "12px 18px",
                background: "#18181b",
                borderBottomLeftRadius: isMobile ? 0 : 18,
                borderBottomRightRadius: isMobile ? 0 : 18,
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe aquí..."
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  padding: isMobile ? "14px 12px" : "12px 16px",
                  borderRadius: 10,
                  fontSize: isMobile ? 16 : 16,
                  background: "#23232b",
                  color: "#fff",
                  marginRight: 8,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.1)"
                }}
                autoFocus
              />
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  background: "#23232b",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "10px 18px",
                  fontSize: 15,
                  cursor: isLoading ? "not-allowed" : "pointer",
                  fontWeight: 600,
                  opacity: isLoading ? 0.6 : 1,
                }}
              >
                Enviar
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
        {/* Overlay de invitación al chat */}
        {showChatInvite && !loading && (
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
              WebkitBackdropFilter: 'blur(8px)'
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
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                animation: 'scaleIn 0.5s ease-out 0.2s both'
              }}
            >
              {/* Título principal */}
              <h2 
                style={{
                  fontSize: isMobile ? '2rem' : '2.5rem',
                  marginBottom: '20px',
                  fontWeight: 'bold',
                  color: '#fff',
                  fontFamily: "'Press Start 2P', cursive",
                  letterSpacing: '2px',
                  textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                  lineHeight: '1.2'
                }}
              >
                AlleRoDi
              </h2>
              
              {/* Descripción */}
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
                  margin: '0 auto 40px auto'
                }}
              >
                ¿Te interesa la música, el diseño o la tecnología? 
                <br />
                Chatea conmigo para conocer mis proyectos.
              </p>
              
              {/* Contenedor de botones usando Grid */}
              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                  gap: isMobile ? '15px' : '20px',
                  maxWidth: '400px',
                  margin: '0 auto'
                }}
              >
                {/* Botón Chatear */}
                <button
                  onClick={() => {
                    console.log('=== BOTÓN CHATEAR CLICKEADO ===');
                    console.log('Estado actual chatOpen:', chatOpen);
                    console.log('Estado actual showChatInvite:', showChatInvite);
                    
                    // Cerrar el overlay
                    setShowChatInvite(false);
                    console.log('showChatInvite establecido en false');
                    
                    // Abrir el chat
                    setChatOpen(true);
                    console.log('chatOpen establecido en true');
                    
                    // Verificar después de un momento
                    setTimeout(() => {
                      console.log('Estado después de 100ms - chatOpen:', chatOpen);
                    }, 100);
                  }}
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
                    overflow: 'hidden'
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
                
                {/* Botón Salir */}
                <button
                  onClick={() => setShowChatInvite(false)}
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
                    overflow: 'hidden'
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
              
              {/* Texto informativo */}
              <p 
                style={{
                  fontSize: '0.75rem',
                  marginTop: '30px',
                  color: '#666',
                  fontWeight: '300',
                  letterSpacing: '1px',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  opacity: 0.7
                }}
              >
                Esta invitación desaparecerá en unos segundos
              </p>
              
              {/* Efectos decorativos */}
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
                  animation: 'glow 3s ease-in-out infinite alternate'
                }}
              />
            </div>
          </div>
        )}

        {/* Barra de navegación principal para desktop */}
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
                <button className="nav-button chat-button" onClick={() => setChatOpen(true)}>
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

            {/* Plataforma de Comercio Digital */}
      <section id="store-project" style={{
              padding: window.innerWidth <= 768 ? '2.5rem 1rem' : '3rem 2rem',
        background: 'linear-gradient(135deg, #1a0f3c 0%, #2d1b69 50%, #4a2b8a 100%)',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
              fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif"
      }}>
              {/* Efectos de fondo */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
          animation: 'pulse 8s ease-in-out infinite alternate'
        }} />
              
        <div style={{
                maxWidth: '900px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
          alignItems: 'center',
                gap: window.innerWidth <= 768 ? '2rem' : '3rem',
          position: 'relative',
          zIndex: 1
        }}>
                
                {/* Imagen - Izquierda */}
          <div style={{
            flex: '1',
                  maxWidth: window.innerWidth <= 768 ? '160px' : '220px',
            margin: '0 auto',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
                    top: window.innerWidth <= 768 ? '-8px' : '-12px',
                    left: window.innerWidth <= 768 ? '-8px' : '-12px',
                    right: window.innerWidth <= 768 ? '-8px' : '-12px',
                    bottom: window.innerWidth <= 768 ? '-8px' : '-12px',
              background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: window.innerWidth <= 768 ? '18px' : '22px',
                    filter: 'blur(20px)',
              animation: 'glow 3s ease-in-out infinite alternate'
            }} />
                  
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
                      borderRadius: '12px'
                    }} 
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
              }} 
            />
                </div>

                {/* Contenido - Derecha */}
          <div style={{
                  flex: '1.2',
            display: 'flex',
            flexDirection: 'column',
                  gap: window.innerWidth <= 768 ? '1.2rem' : '1.5rem',
                  width: '100%',
                  textAlign: window.innerWidth <= 768 ? 'center' : 'left'
          }}>
                  
                  {/* Título y descripción */}
            <div>
              <h2 style={{
                      fontSize: window.innerWidth <= 768 ? '1.8rem' : '2.4rem',
                      marginBottom: window.innerWidth <= 768 ? '1rem' : '1.3rem',
                color: '#fff',
                textAlign: window.innerWidth <= 768 ? 'center' : 'left',
                      fontWeight: '700',
                      letterSpacing: '-0.5px',
                      textShadow: '0 0 20px rgba(255, 255, 255, 0.4)',
                      fontFamily: "'Inter', 'Segoe UI', sans-serif"
                    }}>
                      Plataforma de Comercio Digital
              </h2>
                    
              <p style={{
                fontSize: window.innerWidth <= 768 ? '0.95rem' : '1.1rem',
                      lineHeight: window.innerWidth <= 768 ? '1.6' : '1.7',
                color: '#fff',
                marginBottom: window.innerWidth <= 768 ? '1.5rem' : '2rem',
                textAlign: window.innerWidth <= 768 ? 'center' : 'left',
                      fontWeight: '400',
                      opacity: 0.95,
                      padding: window.innerWidth <= 768 ? '0 0.5rem' : '0',
                      fontFamily: "'Inter', 'Segoe UI', sans-serif"
                    }}>
                      Solución integral de e-commerce que transforma la experiencia de compra online. 
                      Tecnología de vanguardia con interfaz intuitiva que conecta vendedores y compradores 
                      de manera eficiente, segura y escalable.
                    </p>
                    
                    {/* Botón de Instagram */}
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
                          gap: '0.7rem',
                    padding: window.innerWidth <= 768 ? '0.8rem 1.5rem' : '1rem 2rem',
                          background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                          fontSize: window.innerWidth <= 768 ? '0.85rem' : '0.95rem',
                          fontWeight: '600',
                          backdropFilter: 'blur(15px)',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          fontFamily: "'Inter', 'Segoe UI', sans-serif",
                          letterSpacing: '0.3px'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                          e.currentTarget.style.background = 'linear-gradient(45deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2))';
                          e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 255, 255, 0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.background = 'linear-gradient(45deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))';
                          e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                        <svg width={window.innerWidth <= 768 ? "16" : "18"} height={window.innerWidth <= 768 ? "16" : "18"} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                        Síguenos en Instagram
                </a>
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
              <p className="footer-copyright">&copy; 2024 AlleRoDi. Todos los derechos reservados. | <a href="/admin" style={{color: '#666', textDecoration: 'none', fontSize: '0.8rem'}}>Admin</a></p>
          </div>
        </div>
      </footer>
        <ChatBot
          chatOpen={chatOpen}
          setChatOpen={setChatOpen}
          isFullScreen={isFullScreen}
          setIsFullScreen={setIsFullScreen}
        />
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
    <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  </Router>
  );
};

export default App;
