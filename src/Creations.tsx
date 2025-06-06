import { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  description: string;
  duration: string;
  views: string;
  date: string;
  category: string;
}

const Creations = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  const categories = [
    { id: 'todos', name: 'Todos' },
    { id: 'diseños', name: 'Diseños' },
    { id: 'aplicaciones', name: 'Aplicaciones' },
    { id: 'websites', name: 'Websites' },
    { id: 'videos', name: 'Videos' }
  ];

  const videos: Video[] = [
    {
      id: 1,
      title: "Mi Primera Creación",
      thumbnail: "https://i.imgur.com/8XZQZQZ.jpg",
      description: "Una exploración de mis primeros trabajos digitales, donde combino diferentes técnicas y estilos para crear algo único.",
      duration: "3:45",
      views: "1.2K",
      date: "Hace 2 días",
      category: "diseños"
    },
    {
      id: 2,
      title: "Proyecto Digital",
      thumbnail: "https://i.imgur.com/8XZQZQZ.jpg",
      description: "Fusión de arte y tecnología en un proyecto que explora los límites de la creatividad digital.",
      duration: "5:20",
      views: "2.5K",
      date: "Hace 1 semana",
      category: "aplicaciones"
    },
    {
      id: 3,
      title: "Experimento Visual",
      thumbnail: "https://i.imgur.com/8XZQZQZ.jpg",
      description: "Explorando nuevas técnicas y conceptos en el mundo del arte digital.",
      duration: "4:15",
      views: "3.1K",
      date: "Hace 2 semanas",
      category: "videos"
    },
    {
      id: 4,
      title: "Arte Digital",
      thumbnail: "https://i.imgur.com/8XZQZQZ.jpg",
      description: "Creaciones artísticas que combinan lo tradicional con lo digital.",
      duration: "4:30",
      views: "2.8K",
      date: "Hace 3 días",
      category: "diseños"
    },
    {
      id: 5,
      title: "Diseño Creativo",
      thumbnail: "https://i.imgur.com/8XZQZQZ.jpg",
      description: "Un viaje a través del diseño creativo y sus múltiples posibilidades.",
      duration: "6:15",
      views: "3.5K",
      date: "Hace 5 días",
      category: "websites"
    },
    {
      id: 6,
      title: "Innovación Visual",
      thumbnail: "https://i.imgur.com/8XZQZQZ.jpg",
      description: "Explorando nuevas formas de expresión visual en el mundo digital.",
      duration: "5:45",
      views: "2.1K",
      date: "Hace 1 semana",
      category: "videos"
    },
    {
      id: 7,
      title: "Proyecto Multimedia",
      thumbnail: "https://i.imgur.com/8XZQZQZ.jpg",
      description: "Combinando diferentes medios para crear una experiencia única.",
      duration: "7:20",
      views: "4.2K",
      date: "Hace 2 semanas",
      category: "aplicaciones"
    },
    {
      id: 8,
      title: "Arte Experimental",
      thumbnail: "https://i.imgur.com/8XZQZQZ.jpg",
      description: "Explorando los límites del arte digital y sus posibilidades.",
      duration: "4:50",
      views: "3.8K",
      date: "Hace 4 días",
      category: "diseños"
    },
    {
      id: 9,
      title: "Diseño Gráfico",
      thumbnail: "https://i.imgur.com/8XZQZQZ.jpg",
      description: "Fundamentos y técnicas avanzadas de diseño gráfico.",
      duration: "6:30",
      views: "5.1K",
      date: "Hace 1 semana",
      category: "websites"
    },
    {
      id: 10,
      title: "Animación Digital",
      thumbnail: "https://i.imgur.com/8XZQZQZ.jpg",
      description: "Creando animaciones digitales que cobran vida.",
      duration: "8:15",
      views: "4.5K",
      date: "Hace 3 días",
      category: "videos"
    }
  ];

  const filteredVideos = selectedCategory === 'todos' 
    ? videos 
    : videos.filter(video => video.category === selectedCategory);

  return (
    <div className="creations-page">
      {/* Barra de navegación */}
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
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/creations" className="nav-link" aria-current="page">Creations</Link>
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

      {/* Botones de navegación móvil */}
      <div className="mobile-nav">
        <div className="nav-buttons">
          <Link to="/" className="nav-button">
            <i className="fas fa-home"></i>
          </Link>
          <Link to="/stories" className="nav-button">
            <i className="fas fa-book-open"></i>
          </Link>
          <Link to="/creations" className="nav-button active">
            <i className="fas fa-camera"></i>
          </Link>
          <Link to="/store" className="nav-button">
            <i className="fas fa-shopping-cart"></i>
          </Link>
          <Link to="/chat" className="nav-button">
            <i className="fas fa-comments"></i>
          </Link>
        </div>
      </div>

      <div className="creations-container">
        <div className="creations-layout">
          {/* Sección Principal */}
          <div className="main-content">
            {/* Filtro de Categorías */}
            <div className="category-filter">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Reproductor Principal */}
            <div className="main-player">
              {selectedVideo ? (
                <div className="player-content">
                  <div className="player-video">
                    <img src={selectedVideo.thumbnail} alt={selectedVideo.title} />
                    <div className="play-overlay">
                      <i className="fas fa-play"></i>
                    </div>
                  </div>
                  <div className="player-info">
                    <h2>{selectedVideo.title}</h2>
                    <div className="player-stats">
                      <span>{selectedVideo.views} vistas</span>
                      <span>{selectedVideo.date}</span>
                    </div>
                    <p>{selectedVideo.description}</p>
                  </div>
                </div>
              ) : (
                <div className="player-placeholder">
                  <i className="fas fa-play-circle"></i>
                  <p>Selecciona un video para reproducir</p>
                </div>
              )}
            </div>

            {/* Grid de Videos */}
            <div className="videos-grid">
              {filteredVideos.map((video) => (
                <div 
                  key={video.id} 
                  className="video-card"
                  onClick={() => setSelectedVideo(video)}
                >
                  <div className="video-thumbnail-container">
                    <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
                    <span className="video-duration">{video.duration}</span>
                  </div>
                  <div className="video-card-info">
                    <h3 className="video-card-title">{video.title}</h3>
                    <div className="video-card-stats">
                      <span className="video-card-views">{video.views}</span>
                      <span className="video-card-date">{video.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Panel de Información */}
          <div className="info-panel">
            {selectedVideo ? (
              <div className="info-content">
                <h2 className="info-title">{selectedVideo.title}</h2>
                <div className="info-stats">
                  <span className="info-views">{selectedVideo.views} vistas</span>
                  <span className="info-date">{selectedVideo.date}</span>
                </div>
                <div className="info-description">
                  <h3>Descripción</h3>
                  <p>{selectedVideo.description}</p>
                </div>
              </div>
            ) : (
              <div className="info-placeholder">
                <i className="fas fa-info-circle"></i>
                <p>Selecciona un video para ver su información</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creations; 