import { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

interface StoryEvent {
  id: number;
  year: string;
  title: string;
  description: string;
  image?: string;
  category: 'music' | 'tech' | 'art' | 'life';
}

const Stories = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const stories: StoryEvent[] = [
    {
      id: 1,
      year: '2024',
      title: 'Nuevo Álbum en Desarrollo',
      description: 'Trabajando en un nuevo proyecto musical que fusiona electrónica con elementos experimentales.',
      category: 'music',
      image: 'https://i.imgur.com/8XZQZQZ.jpg'
    },
    {
      id: 2,
      year: '2023',
      title: 'Lanzamiento de AlleRoDi Website',
      description: 'Creación de mi sitio web personal, combinando música, arte y tecnología.',
      category: 'tech',
      image: 'https://i.imgur.com/8XZQZQZ.jpg'
    },
    {
      id: 3,
      year: '2022',
      title: 'Primer EP Digital',
      description: 'Lanzamiento de mi primer EP, marcando el inicio de mi carrera musical.',
      category: 'music',
      image: 'https://i.imgur.com/8XZQZQZ.jpg'
    },
    {
      id: 4,
      year: '2021',
      title: 'Inicio en el Desarrollo Web',
      description: 'Comienzo de mi viaje en el mundo del desarrollo web y la programación.',
      category: 'tech',
      image: 'https://i.imgur.com/8XZQZQZ.jpg'
    }
  ];

  const filteredStories = activeCategory === 'all' 
    ? stories 
    : stories.filter(story => story.category === activeCategory);

  return (
    <div className="stories-page">
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
                <Link to="/creations" className="nav-link">Creations</Link>
              </li>
              <li className="nav-item">
                <Link to="/stories" className="nav-link" aria-current="page">Stories</Link>
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
          <Link to="/stories" className="nav-button active">
            <i className="fas fa-book-open"></i>
          </Link>
          <Link to="/creations" className="nav-button">
            <i className="fas fa-camera"></i>
          </Link>
          <Link to="/store" className="nav-button">
            <i className="fas fa-shopping-cart"></i>
          </Link>
        </div>
      </div>

      <div className="stories-container">
        <h1 className="stories-title">Mi Historia</h1>
        
        <div className="stories-filter">
          <button 
            className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            Todo
          </button>
          <button 
            className={`filter-btn ${activeCategory === 'music' ? 'active' : ''}`}
            onClick={() => setActiveCategory('music')}
          >
            Música
          </button>
          <button 
            className={`filter-btn ${activeCategory === 'tech' ? 'active' : ''}`}
            onClick={() => setActiveCategory('tech')}
          >
            Tecnología
          </button>
          <button 
            className={`filter-btn ${activeCategory === 'art' ? 'active' : ''}`}
            onClick={() => setActiveCategory('art')}
          >
            Arte
          </button>
        </div>

        <div className="timeline">
          {filteredStories.map((story, index) => (
            <div key={story.id} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
              <div className="timeline-content">
                <div className="timeline-year">{story.year}</div>
                <h3 className="timeline-title">{story.title}</h3>
                <p className="timeline-description">{story.description}</p>
                {story.image && (
                  <div className="timeline-image">
                    <img src={story.image} alt={story.title} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stories; 