import { Link } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress.js';
import { useState, useRef, useEffect } from 'react';
import ThemeToggle from './ThemeToggle.jsx';
import { enableDeveloperMode } from '../utils/debug.js';

/**
 * Barra de navegación que aparece en todas las páginas
 * Muestra el logo, enlaces de navegación, puntos del usuario y toggle de tema
 */
export default function Navbar() {
  const progress = useProgress();
  const [logoClicks, setLogoClicks] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Activar modo desarrollador con doble clic en el logo
  const handleLogoClick = () => {
    setLogoClicks(prev => {
      const newCount = prev + 1;
      if (newCount >= 2) {
        enableDeveloperMode();
        setLogoClicks(0);
      }
      // Resetear contador después de 2 segundos
      setTimeout(() => setLogoClicks(0), 2000);
      return newCount;
    });
  };

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && 
          !event.target.closest('.mobile-menu-toggle')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Cerrar menú móvil al hacer clic en un enlace
  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-left">
            <button 
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
            <Link 
              to="/" 
              className="navbar-logo"
              onClick={handleLogoClick}
              title="Doble clic para modo desarrollador"
            >
              Finast
            </Link>
          </div>
          
          <div className="navbar-links">
            <Link to="/levels" className="navbar-link">Niveles</Link>
            <Link to="/progress" className="navbar-link">Progreso</Link>
            
            {/* Menú desplegable para Recursos, Diccionario y Simulador */}
            <div className="navbar-dropdown" ref={dropdownRef}>
              <button
                className="navbar-link dropdown-toggle"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-expanded={dropdownOpen}
              >
                Herramientas
                <span className="dropdown-arrow">{dropdownOpen ? '▲' : '▼'}</span>
              </button>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <Link 
                    to="/resources" 
                    className="dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Recursos
                  </Link>
                  <Link 
                    to="/glossary" 
                    className="dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Diccionario
                  </Link>
                  <Link 
                    to="/simulator" 
                    className="dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Simulador
                  </Link>
                </div>
              )}
            </div>
            
            <Link to="/shop" className="navbar-link">Tienda</Link>
            <Link to="/profile" className="navbar-link">Perfil</Link>
            <Link to="/community" className="navbar-link">Comunidad</Link>
          </div>
          
          <div className="navbar-controls">
            {/* Toggle de tema */}
            <ThemeToggle />
            
            {/* Puntos */}
            <div className="navbar-points">
              {progress.points} puntos
            </div>
          </div>
        </div>
      </nav>

      {/* Menú móvil lateral */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`} onClick={handleMobileLinkClick}>
        <div 
          className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}
          ref={mobileMenuRef}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mobile-menu-header">
            <Link 
              to="/" 
              className="mobile-menu-logo"
              onClick={handleMobileLinkClick}
            >
              Finast
            </Link>
            <button 
              className="mobile-menu-close"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Cerrar menú"
            >
              ✕
            </button>
          </div>
          
          <div className="mobile-menu-content">
            <Link to="/levels" className="mobile-menu-link" onClick={handleMobileLinkClick}>
              Niveles
            </Link>
            <Link to="/progress" className="mobile-menu-link" onClick={handleMobileLinkClick}>
              Progreso
            </Link>
            
            <div className="mobile-menu-section">
              <div className="mobile-menu-section-title">Herramientas</div>
              <Link to="/resources" className="mobile-menu-link mobile-menu-sublink" onClick={handleMobileLinkClick}>
                Recursos
              </Link>
              <Link to="/glossary" className="mobile-menu-link mobile-menu-sublink" onClick={handleMobileLinkClick}>
                Diccionario
              </Link>
              <Link to="/simulator" className="mobile-menu-link mobile-menu-sublink" onClick={handleMobileLinkClick}>
                Simulador
              </Link>
            </div>
            
            <Link to="/shop" className="mobile-menu-link" onClick={handleMobileLinkClick}>
              Tienda
            </Link>
            <Link to="/profile" className="mobile-menu-link" onClick={handleMobileLinkClick}>
              Perfil
            </Link>
            <Link to="/community" className="mobile-menu-link" onClick={handleMobileLinkClick}>
              Comunidad
            </Link>
          </div>
          
          <div className="mobile-menu-footer">
            <div className="mobile-menu-points">
              {progress.points} puntos
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
}

