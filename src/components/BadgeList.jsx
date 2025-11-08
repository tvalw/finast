import { getUnlockedBadges } from '../utils/progress.js';

/**
 * Componente que muestra las insignias desbloqueadas por el usuario
 */
export default function BadgeList() {
  const badges = getUnlockedBadges();
  
  if (badges.length === 0) {
    return (
      <div className="badge-list">
        <p>¡Completa lecciones para ganar insignias! 🏆</p>
      </div>
    );
  }
  
  return (
    <div className="badge-list">
      <h3>Insignias Desbloqueadas</h3>
      <div className="badges-grid">
        {badges.map(badge => (
          <div key={badge.id} className="badge-item">
            <div className="badge-icon">🏆</div>
            <div className="badge-name">{badge.name}</div>
            <div className="badge-description">{badge.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

