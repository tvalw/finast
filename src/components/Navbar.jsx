import { Link } from 'react-router-dom';
import { getProgress } from '../utils/storage.js';
import { useEffect, useState } from 'react';

/**
 * Barra de navegación que aparece en todas las páginas
 * Muestra el logo, enlaces de navegación y los puntos del usuario
 */
export default function Navbar() {
  const [points, setPoints] = useState(0);

  // Actualizar puntos cuando el componente se monta y cuando cambian
  useEffect(() => {
    const updatePoints = () => {
      const progress = getProgress();
      setPoints(progress.points || 0);
    };
    
    // Actualizar al montar
    updatePoints();
    
    // Escuchar cambios en localStorage (por si se actualiza desde otra pestaña)
    const handleStorageChange = () => {
      updatePoints();
    };
    
    // Escuchar evento personalizado cuando se actualizan los puntos
    const handlePointsUpdate = () => {
      updatePoints();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('finast:pointsUpdated', handlePointsUpdate);
    
    // Actualizar también cuando se hace foco en la ventana (por si se actualizó en otra pestaña)
    const handleFocus = () => {
      updatePoints();
    };
    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('finast:pointsUpdated', handlePointsUpdate);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          💰 Finast
        </Link>
        
        <div className="navbar-links">
          <Link to="/" className="navbar-link">Inicio</Link>
          <Link to="/levels" className="navbar-link">Niveles</Link>
          <Link to="/progress" className="navbar-link">Progreso</Link>
        </div>
        
        <div className="navbar-points">
          ⭐ {points} puntos
        </div>
      </div>
    </nav>
  );
}

