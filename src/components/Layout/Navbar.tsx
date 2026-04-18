import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav
    className="navbar navbar-expand-lg navbar-light fixed-top"
    role="navigation"
    aria-label="Navegación principal"
  >
    <div className="container">
      <Link className="navbar-brand" to="/" aria-label="Ir a inicio">
        AlleRoDi
      </Link>
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
            <Link to="/" className="nav-link" aria-current="page">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/creations" className="nav-link">
              Creations
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/stories" className="nav-link">
              Stories
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/music" className="nav-link">
              Music
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/social" className="nav-link">
              Social
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
