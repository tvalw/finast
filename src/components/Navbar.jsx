import { Link } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress.js';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle.jsx';
import { enableDeveloperMode } from '../utils/debug.js';

/**
 * Barra de navegación que aparece en todas las páginas
 * Muestra el logo, enlaces de navegación, puntos del usuario y toggle de tema
 */
export default function Navbar() {
  const progress = useProgress();
  const [logoClicks, setLogoClicks] = useState(0);

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
                <Link to="/resources" className="navbar-link">Recursos</Link>
                <Link to="/shop" className="navbar-link">🛍️ Tienda</Link>
                <Link to="/simulator" className="navbar-link">💰 Simulador</Link>
                <Link to="/glossary" className="navbar-link">📘 Diccionario</Link>
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

