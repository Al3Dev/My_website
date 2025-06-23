import React from 'react';

const Admin = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a0f3c 0%, #2d1b69 50%, #4a2b8a 100%)',
      color: '#fff',
      padding: '2rem',
      fontFamily: "'Poppins', sans-serif"
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        paddingTop: '100px'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          marginBottom: '2rem',
          textAlign: 'center',
          fontWeight: '600',
          letterSpacing: '1px'
        }}>
          Panel de Administración
        </h1>
        
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          padding: '2rem',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          marginBottom: '2rem'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            color: '#fff'
          }}>
            Estadísticas del Chat
          </h2>
          <p style={{
            color: '#ccc',
            lineHeight: '1.6'
          }}>
            Aquí podrás ver estadísticas de uso del chat, mensajes guardados y logs del sistema anti-spam.
          </p>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          padding: '2rem',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          marginBottom: '2rem'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            color: '#fff'
          }}>
            Logs Anti-Spam
          </h2>
          <p style={{
            color: '#ccc',
            lineHeight: '1.6'
          }}>
            Registro de bloqueos y detecciones de spam del sistema.
          </p>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          padding: '2rem',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            color: '#fff'
          }}>
            Configuración
          </h2>
          <p style={{
            color: '#ccc',
            lineHeight: '1.6'
          }}>
            Ajustes del sistema y configuración general.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Admin; 