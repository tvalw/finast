import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCompletedLessonsCount } from '../utils/storage.js';
import { isLevelUnlocked } from '../utils/progress.js';

/**
 * Tarjeta que muestra información de un nivel
 * Muestra título, descripción, estado (disponible/bloqueado) y progreso
 */
export default function LevelCard({ level }) {
  const [isUnlocked, setIsUnlocked] = useState(() => isLevelUnlocked(level.id));
  const [completedCount, setCompletedCount] = useState(() => getCompletedLessonsCount(level.id));
  const totalLessons = level.lessons.length;

  // Actualizar el estado cuando se desbloquea un nivel o se completa una lección
  useEffect(() => {
    const updateState = () => {
      setIsUnlocked(isLevelUnlocked(level.id));
      setCompletedCount(getCompletedLessonsCount(level.id));
    };

    // Actualizar al montar
    updateState();

    // Escuchar eventos de desbloqueo de nivel
    const handleLevelUnlocked = (event) => {
      // Si se desbloqueó este nivel o cualquier nivel, actualizar
      updateState();
    };

    // Escuchar eventos de actualización de puntos (que también puede indicar progreso)
    const handlePointsUpdate = () => updateState();

    // Escuchar cambios en localStorage
    const handleStorageChange = () => updateState();

    // Actualizar cuando la ventana recibe foco (útil cuando se vuelve a la página)
    const handleFocus = () => updateState();

    window.addEventListener('finast:levelUnlocked', handleLevelUnlocked);
    window.addEventListener('finast:pointsUpdated', handlePointsUpdate);
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('finast:levelUnlocked', handleLevelUnlocked);
      window.removeEventListener('finast:pointsUpdated', handlePointsUpdate);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [level.id]);
  
  return (
    <div className={`level-card ${!isUnlocked ? 'locked' : ''}`}>
      <div className="level-card-header">
        <h3>{level.title}</h3>
        <span className={`level-status ${isUnlocked ? 'available' : 'locked'}`}>
          {isUnlocked ? '✅ Disponible' : '🔒 Bloqueado'}
        </span>
      </div>
      
      <p className="level-description">{level.description}</p>
      
      <div className="level-progress">
        <span>Lecciones completadas: {completedCount}/{totalLessons}</span>
      </div>
      
      <Link 
        to={isUnlocked && level.lessons.length > 0 ? `/lesson/${level.id}/${level.lessons[0].id}` : '#'} 
        className={`btn ${!isUnlocked ? 'btn-disabled' : 'btn-primary'}`}
        onClick={(e) => (!isUnlocked || level.lessons.length === 0) && e.preventDefault()}
      >
        {isUnlocked ? 'Comenzar lección' : 'Bloqueado'}
      </Link>
    </div>
  );
}

