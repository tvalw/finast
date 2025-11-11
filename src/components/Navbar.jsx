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
  const dropdownRef = useRef(null);

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
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link 
          to="/" 
          className="navbar-logo"
          onClick={handleLogoClick}
          title="Doble clic para modo desarrollador"
        >
          💰 Finast
        </Link>
        
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
              📚 Herramientas
              <span className="dropdown-arrow">{dropdownOpen ? '▲' : '▼'}</span>
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <Link 
                  to="/resources" 
                  className="dropdown-item"
                  onClick={() => setDropdownOpen(false)}
                >
                  📄 Recursos
                </Link>
                <Link 
                  to="/glossary" 
                  className="dropdown-item"
                  onClick={() => setDropdownOpen(false)}
                >
                  📘 Diccionario
                </Link>
                <Link 
                  to="/simulator" 
                  className="dropdown-item"
                  onClick={() => setDropdownOpen(false)}
                >
                  💰 Simulador
                </Link>
              </div>
            )}
          </div>
          
          <Link to="/shop" className="navbar-link">🛍️ Tienda</Link>
          <Link to="/mode" className="navbar-link">⚙️ Modo</Link>
          <Link to="/profile" className="navbar-link">Perfil</Link>
          <Link to="/community" className="navbar-link">Comunidad</Link>
        </div>
        
        <div className="navbar-controls">
          {/* Toggle de tema */}
          <ThemeToggle />
          
          {/* Puntos */}
          <div className="navbar-points">
            ⭐ {progress.points} puntos
          </div>
        </div>
      </div>
    </nav>
  );
}

