import { Link } from 'react-router-dom';
import { getCompletedLessonsCount } from '../utils/storage.js';
import { isLevelUnlocked } from '../utils/progress.js';

/**
 * Tarjeta que muestra información de un nivel
 * Muestra título, descripción, estado (disponible/bloqueado) y progreso
 */
export default function LevelCard({ level }) {
  const isUnlocked = isLevelUnlocked(level.id);
  const completedCount = getCompletedLessonsCount(level.id);
  const totalLessons = level.lessons.length;
  
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

