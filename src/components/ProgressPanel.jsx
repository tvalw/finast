import { getProgress } from '../utils/storage.js';

/**
 * Panel que muestra el progreso general del usuario
 * Muestra puntos, racha y nivel alcanzado
 */
export default function ProgressPanel() {
  const progress = getProgress();
  
  // Calcular el nivel más alto desbloqueado
  const highestLevel = Math.max(...progress.unlockedLevels, 1);
  
  return (
    <div className="progress-panel">
      <h3>Tu Progreso</h3>
      <div className="progress-stats">
        <div className="stat-item">
          <div className="stat-value">⭐ {progress.points || 0}</div>
          <div className="stat-label">Puntos</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">🔥 {progress.streak || 0}</div>
          <div className="stat-label">Racha (días)</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">📚 {highestLevel}</div>
          <div className="stat-label">Nivel alcanzado</div>
        </div>
      </div>
    </div>
  );
}

