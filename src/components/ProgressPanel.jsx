import { useProgress } from '../hooks/useProgress.js';

/**
 * Panel que muestra el progreso general del usuario
 * Muestra puntos, racha, nivel alcanzado y barra de progreso visual
 */
export default function ProgressPanel() {
  const progress = useProgress();
  
  // Calcular el nivel más alto desbloqueado
  const highestLevel = Math.max(...progress.unlockedLevels, 1);
  
  /**
   * Obtiene el nombre del nivel del usuario basado en sus puntos
   */
  function getLevelName(points) {
    if (points < 50) return "Novato 💡";
    if (points < 150) return "Intermedio 💪";
    return "Experto 💰";
  }
  
  return (
    <div className="progress-panel">
      <h3>Mi Progreso</h3>
      
      {/* Barra de progreso visual */}
      <div className="progress-bar-container">
        <div className="progress-bar-label">
          Lecciones completadas: {progress.totalProgress}%
        </div>
        <div className="progress-bar">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${progress.totalProgress}%` }}
          ></div>
        </div>
      </div>
      
      <div className="progress-stats">
        <div className="stat-item">
          <div className="stat-value">⭐ {progress.points}</div>
          <div className="stat-label">Puntos</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">🔥 {progress.streak}</div>
          <div className="stat-label">Racha (días)</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">📚 {highestLevel}</div>
          <div className="stat-label">Nivel alcanzado</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{getLevelName(progress.points)}</div>
          <div className="stat-label">Nivel actual</div>
        </div>
      </div>
    </div>
  );
}

