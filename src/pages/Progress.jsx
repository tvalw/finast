import ProgressPanel from '../components/ProgressPanel.jsx';
import BadgeList from '../components/BadgeList.jsx';
import { getProgress } from '../utils/storage.js';
import { levels } from '../data/levels.js';
import { useProgress } from '../hooks/useProgress.js';

/**
 * Página que muestra el progreso detallado del usuario
 * Incluye estadísticas, insignias y progreso por nivel
 */
export default function Progress() {
  const progress = getProgress();
  const progressData = useProgress();

  // Calcular estadísticas adicionales
  const totalLessonsCompleted = Object.values(progress.completedLessons)
    .reduce((sum, lessons) => sum + lessons.length, 0);
  
  const totalLessons = levels.reduce((sum, level) => sum + level.lessons.length, 0);

  return (
    <div className="page progress-page shop-page">
      <div className="shop-header">
        <h1>Mi Progreso</h1>
        <div className="shop-balance">
          <span className="balance-label">Tus puntos:</span>
          <span className="balance-amount">{progressData.points}</span>
        </div>
      </div>
      
      <ProgressPanel />
      
      <div className="shop-grid progress-grid">
        <div className="shop-item">
          <div className="shop-item-header">
            <span className="item-icon">📊</span>
          </div>
          <div className="shop-item-content">
            <h3 className="item-name">Estadísticas Generales</h3>
            <div className="stats-grid">
              <div className="stat-box">
                <div className="stat-number">{totalLessonsCompleted}</div>
                <div className="stat-label">Lecciones completadas</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">{totalLessons}</div>
                <div className="stat-label">Total de lecciones</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">
                  {totalLessons > 0 
                    ? Math.round((totalLessonsCompleted / totalLessons) * 100) 
                    : 0}%
                </div>
                <div className="stat-label">Progreso total</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="shop-item">
          <div className="shop-item-header">
            <span className="item-icon">📈</span>
          </div>
          <div className="shop-item-content">
            <h3 className="item-name">Progreso por Nivel</h3>
            <div className="levels-progress">
              {levels.map(level => {
                const completed = progress.completedLessons[level.id]?.length || 0;
                const total = level.lessons.length;
                const percentage = total > 0 ? (completed / total) * 100 : 0;
                
                return (
                  <div key={level.id} className="level-progress-item">
                    <div className="level-progress-header">
                      <span>{level.title}</span>
                      <span>{completed}/{total}</span>
                    </div>
                    <div className="level-progress-bar">
                      <div 
                        className="level-progress-fill" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      <BadgeList />
    </div>
  );
}

