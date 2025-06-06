import React, { useState, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  sizes: string[];
  colors: string[];
}

// Componente de tarjeta de producto memoizado
const ProductCard = memo(({ product, onClick }: { product: Product; onClick: (product: Product) => void }) => (
  <div 
    className="store-product-card"
    onClick={() => onClick(product)}
    role="button"
    tabIndex={0}
    onKeyPress={(e) => e.key === 'Enter' && onClick(product)}
    aria-label={`Ver detalles de ${product.name}`}
  >
    <div className="store-product-image">
      <img 
        src={product.image} 
        alt={product.name} 
        loading="lazy"
        width="300"
        height="300"
      />
    </div>
    <div className="store-product-info">
      <h3 className="store-product-name">{product.name}</h3>
      <p className="store-product-price">${product.price}</p>
    </div>
  </div>
));

const Store = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');

  const products: Product[] = [
    {
      id: 1,
      name: 'AlleRoDi Logo Tee',
      price: 29.99,
      image: 'https://i.imgur.com/8XZQZQZ.jpg',
      description: 'Camiseta minimalista con el logo de AlleRoDi en el centro.',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Negro', 'Blanco']
    },
    {
      id: 2,
      name: 'AlleRoDi Signature Hoodie',
      price: 49.99,
      image: 'https://i.imgur.com/8XZQZQZ.jpg',
      description: 'Sudadera con capucha con el diseño exclusivo de AlleRoDi.',
      sizes: ['M', 'L', 'XL'],
      colors: ['Negro', 'Gris']
    },
    {
      id: 3,
      name: 'AlleRoDi Music Collection',
      price: 39.99,
      image: 'https://i.imgur.com/8XZQZQZ.jpg',
      description: 'Camiseta con diseño inspirado en la música de AlleRoDi.',
      sizes: ['S', 'M', 'L'],
      colors: ['Negro', 'Blanco', 'Gris']
    }
  ];

  const handleProductClick = useCallback((product: Product) => {
    setSelectedProduct(product);
    setSelectedSize('');
    setSelectedColor('');
  }, []);

  const handleAddToCart = useCallback(() => {
    if (!selectedProduct || !selectedSize || !selectedColor) {
      alert('Por favor selecciona talla y color');
      return;
    }
    // Aquí iría la lógica para agregar al carrito
    alert('Producto agregado al carrito');
  }, [selectedProduct, selectedSize, selectedColor]);

  const scrollCarousel = useCallback((direction: 'left' | 'right') => {
    const scrollContainer = document.querySelector('.store-products-scroll');
    if (scrollContainer) {
      const scrollAmount = 300; // Ancho de una tarjeta + gap
      scrollContainer.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  }, []);

  // Pruebas de accesibilidad
  const handleKeyPress = useCallback((e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      action();
    }
  }, []);

  // Pruebas de rendimiento
  const handleImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.classList.add('loaded');
  }, []);

  return (
    <div className="store-page" role="main">
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

      {/* Hero visual de la tienda */}
      <section className="store-hero-section" aria-labelledby="store-hero-title">
        <div className="store-hero-container">
          <div className="store-hero-image">
            <img 
              src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80" 
              alt="Banner Tienda" 
              loading="eager"
              width="800"
              height="400"
              onLoad={handleImageLoad}
            />
          </div>
          <div className="store-hero-content">
            <h2 id="store-hero-title" className="store-hero-title">Bienvenido a la Tienda Oficial</h2>
            <p className="store-hero-desc">Descubre productos exclusivos y minimalistas inspirados en AlleRoDi.</p>
            <a 
              href="#productos" 
              className="store-hero-btn" 
              role="button"
              onKeyPress={(e) => handleKeyPress(e, () => window.location.href = '#productos')}
            >
              Comprar ahora
            </a>
          </div>
        </div>
      </section>

      {/* Botones de navegación móvil */}
      <div className="mobile-nav" role="navigation" aria-label="Navegación móvil">
        <div className="nav-buttons">
          <Link to="/" className="nav-button" aria-label="Ir a inicio">
            <i className="fas fa-home" aria-hidden="true"></i>
          </Link>
          <Link to="/stories" className="nav-button" aria-label="Ir a historias">
            <i className="fas fa-book-open" aria-hidden="true"></i>
          </Link>
          <Link to="/creations" className="nav-button" aria-label="Ir a creaciones">
            <i className="fas fa-camera" aria-hidden="true"></i>
          </Link>
          <Link to="/store" className="nav-button active" aria-label="Ir a tienda">
            <i className="fas fa-shopping-cart" aria-hidden="true"></i>
          </Link>
        </div>
      </div>

      {/* Carrusel de productos */}
      <section className="store-products-section" aria-labelledby="store-products-title">
        <div className="store-products-container">
          <h2 id="store-products-title" className="store-products-title">Productos Destacados</h2>
          <div className="store-products-carousel">
            <button 
              className="carousel-arrow carousel-arrow-left"
              onClick={() => scrollCarousel('left')}
              aria-label="Desplazar productos a la izquierda"
              onKeyPress={(e) => handleKeyPress(e, () => scrollCarousel('left'))}
            >
              <i className="fas fa-chevron-left" aria-hidden="true"></i>
            </button>
            <div 
              className="store-products-scroll"
              role="list"
              aria-label="Lista de productos"
            >
              {products.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onClick={handleProductClick}
                />
              ))}
            </div>
            <button 
              className="carousel-arrow carousel-arrow-right"
              onClick={() => scrollCarousel('right')}
              aria-label="Desplazar productos a la derecha"
              onKeyPress={(e) => handleKeyPress(e, () => scrollCarousel('right'))}
            >
              <i className="fas fa-chevron-right" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Modal de producto */}
      {selectedProduct && (
        <div 
          className="store-product-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="store-modal-content">
            <button 
              className="store-close-modal" 
              onClick={() => setSelectedProduct(null)}
              aria-label="Cerrar modal"
              onKeyPress={(e) => handleKeyPress(e, () => setSelectedProduct(null))}
            >
              <i className="fas fa-times" aria-hidden="true"></i>
            </button>
            <div className="store-modal-product">
              <div className="store-modal-image">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  loading="eager"
                  width="400"
                  height="400"
                  onLoad={handleImageLoad}
                />
              </div>
              <div className="store-modal-details">
                <h2 id="modal-title" className="store-modal-title">{selectedProduct.name}</h2>
                <p className="store-modal-price">${selectedProduct.price}</p>
                <p className="store-modal-description">{selectedProduct.description}</p>
                
                <div className="store-size-selector" role="group" aria-labelledby="size-title">
                  <h3 id="size-title">Talla</h3>
                  <div className="store-size-options">
                    {selectedProduct.sizes.map(size => (
                      <button
                        key={size}
                        className={`store-size-btn ${selectedSize === size ? 'active' : ''}`}
                        onClick={() => setSelectedSize(size)}
                        aria-pressed={selectedSize === size}
                        onKeyPress={(e) => handleKeyPress(e, () => setSelectedSize(size))}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="store-color-selector" role="group" aria-labelledby="color-title">
                  <h3 id="color-title">Color</h3>
                  <div className="store-color-options">
                    {selectedProduct.colors.map(color => (
                      <button
                        key={color}
                        className={`store-color-btn ${selectedColor === color ? 'active' : ''}`}
                        onClick={() => setSelectedColor(color)}
                        aria-pressed={selectedColor === color}
                        onKeyPress={(e) => handleKeyPress(e, () => setSelectedColor(color))}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
                
                <button 
                  className="store-add-to-cart-btn" 
                  onClick={handleAddToCart}
                  aria-label="Agregar al carrito"
                  onKeyPress={(e) => handleKeyPress(e, handleAddToCart)}
                >
                  Agregar al Carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Store; 