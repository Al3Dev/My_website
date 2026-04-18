import React, { useState, useEffect, useRef } from 'react';
import type { ChatBotProps } from '../../types';
import type { ChatMessage } from '../../types';
import { getGeminiResponse } from '../../services/gemini';

const ChatBot = ({ chatOpen, setChatOpen, isFullScreen, setIsFullScreen }: ChatBotProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: '¡Hey! Soy AlleRoDi, ¿cómo andas?' },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: inputMessage };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const newHistory = [...messages, userMessage];
      const botResponse = await getGeminiResponse(newHistory);

      setTimeout(() => {
        setMessages((prev) => [...prev, { role: 'assistant', content: botResponse }]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error enviando mensaje:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Ocurrió un error. Intenta de nuevo en unos segundos.' },
      ]);
      setIsLoading(false);
    }
  };

  const closeChat = () => setChatOpen(false);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const windowStyle: React.CSSProperties = isMobile
    ? {
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        borderRadius: 0,
        background: '#18181b',
        zIndex: 2100,
        display: 'flex',
        flexDirection: 'column',
      }
    : isFullScreen
      ? {
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          borderRadius: 0,
          background: '#18181b',
          zIndex: 2100,
          display: 'flex',
          flexDirection: 'column',
        }
      : {
          bottom: 100,
          right: 24,
          width: 380,
          height: 520,
          borderRadius: 18,
          background: '#18181b',
          zIndex: 2100,
          boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
          display: 'flex',
          flexDirection: 'column',
          border: '1.5px solid #23232b',
        };

  return (
    <>
      {!isMobile && (
        <button
          className="chatbot-fab"
          onClick={() => setChatOpen(true)}
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 2000,
            borderRadius: '20px',
            width: 64,
            height: 64,
            background: '#18181b',
            color: '#fff',
            border: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            fontSize: 32,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Abrir chat"
        >
          <i className="fas fa-comments"></i>
        </button>
      )}

      {chatOpen && (
        <div className="chatbot-window" style={{ position: 'fixed', ...windowStyle }}>
          <div
            style={{
              padding: isMobile ? '20px 16px 12px 16px' : '18px 20px 12px 20px',
              borderBottom: '1px solid #23232b',
              background: '#18181b',
              color: '#fff',
              borderTopLeftRadius: isMobile || isFullScreen ? 0 : 18,
              borderTopRightRadius: isMobile || isFullScreen ? 0 : 18,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <b style={{ fontSize: isMobile ? 18 : 16, fontWeight: 600 }}>AlleRoDi</b>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {!isMobile && !isFullScreen && (
                <button
                  onClick={() => setIsFullScreen(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#fff',
                    fontSize: 22,
                    cursor: 'pointer',
                    width: 38,
                    height: 38,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
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
                    background: 'none',
                    border: 'none',
                    color: '#fff',
                    fontSize: 22,
                    cursor: 'pointer',
                    width: 38,
                    height: 38,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
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
                  background: 'none',
                  border: 'none',
                  color: '#fff',
                  fontSize: 24,
                  cursor: 'pointer',
                  width: 38,
                  height: 38,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                }}
                aria-label="Cerrar chat"
              >
                ×
              </button>
            </div>
          </div>

          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: isMobile ? '18px 10px 12px 10px' : '18px 18px 12px 18px',
              background: '#18181b',
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  marginBottom: 14,
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    background: '#23232b',
                    color: msg.role === 'user' ? '#fff' : '#b3b3b3',
                    borderRadius: 14,
                    padding: isMobile ? '10px 16px' : '10px 18px',
                    maxWidth: '80%',
                    wordBreak: 'break-word',
                    fontSize: isMobile ? 15 : 15.5,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    borderTopRightRadius: msg.role === 'user' ? 4 : 14,
                    borderTopLeftRadius: msg.role === 'user' ? 14 : 4,
                    border: '1.5px solid #23232b',
                  }}
                >
                  {msg.content}
                </span>
              </div>
            ))}
            {isLoading && (
              <div style={{ marginBottom: 14, display: 'flex', justifyContent: 'flex-start' }}>
                <span
                  style={{
                    display: 'inline-block',
                    background: '#23232b',
                    color: '#b3b3b3',
                    borderRadius: 14,
                    padding: isMobile ? '10px 16px' : '10px 18px',
                    maxWidth: '80%',
                    wordBreak: 'break-word',
                    fontSize: isMobile ? 15 : 15.5,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    borderTopLeftRadius: 4,
                    borderTopRightRadius: 14,
                    border: '1.5px solid #23232b',
                    fontStyle: 'italic',
                  }}
                >
                  Escribiendo...
                </span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            style={{
              display: 'flex',
              borderTop: '1px solid #23232b',
              padding: isMobile ? '10px 8px' : '12px 18px',
              background: '#18181b',
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
                border: 'none',
                outline: 'none',
                padding: isMobile ? '14px 12px' : '12px 16px',
                borderRadius: 10,
                fontSize: 16,
                background: '#23232b',
                color: '#fff',
                marginRight: 8,
                boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
              }}
              autoFocus
            />
            <button
              type="submit"
              disabled={isLoading}
              style={{
                background: '#23232b',
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                padding: '10px 18px',
                fontSize: 15,
                cursor: isLoading ? 'not-allowed' : 'pointer',
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

export default ChatBot;
