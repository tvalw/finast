import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { levels } from '../data/levels.js';
import { getProgress, isLessonCompleted } from '../utils/storage.js';
import { isLevelUnlocked, isLevelCompleted } from '../utils/progress.js';

/**
 * Componente de mapa visual interactivo de niveles estilo Duolingo
 * 
 * Muestra todos los niveles y lecciones como nodos conectados,
 * con estados visuales (completado, disponible, bloqueado) y animaciones.
 */
export default function LevelMap() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(() => getProgress());
  const [hoveredLesson, setHoveredLesson] = useState(null);

  // Actualizar progreso cuando cambia
  useEffect(() => {
    const updateProgress = () => {
      setProgress(getProgress());
    };

    updateProgress();

    const handlePointsUpdate = () => updateProgress();
    const handleStorageChange = () => updateProgress();
    const handleFocus = () => updateProgress();

    window.addEventListener('finast:pointsUpdated', handlePointsUpdate);
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('finast:pointsUpdated', handlePointsUpdate);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  /**
   * Obtiene el estado de una lección
   * @param {number} levelId - ID del nivel
   * @param {string} lessonId - ID de la lección
   * @returns {string} 'completed' | 'available' | 'locked'
   */
  const getLessonStatus = (levelId, lessonId) => {
    const levelUnlocked = isLevelUnlocked(levelId);
    
    if (!levelUnlocked) {
      return 'locked';
    }

    if (isLessonCompleted(levelId, lessonId)) {
      return 'completed';
    }

    // Verificar si es la primera lección del nivel o si la anterior está completada
    const level = levels.find(l => l.id === levelId);
    if (!level) return 'locked';

    const lessonIndex = level.lessons.findIndex(l => l.id === lessonId);
    
    // Primera lección del nivel desbloqueado siempre está disponible
    if (lessonIndex === 0) {
      return 'available';
    }

    // Verificar si la lección anterior está completada
    const previousLesson = level.lessons[lessonIndex - 1];
    if (previousLesson && isLessonCompleted(levelId, previousLesson.id)) {
      return 'available';
    }

    return 'locked';
  };

  /**
   * Obtiene el ícono para una lección según su estado
   */
  const getLessonIcon = (status, lessonIndex) => {
    if (status === 'completed') {
      return '✅';
    }
    if (status === 'available') {
      // Íconos alternados para variedad visual
      const icons = ['💰', '📊', '🏦', '💳', '📈', '💡', '🎯', '💎'];
      return icons[lessonIndex % icons.length];
    }
    return '🔒';
  };

  /**
   * Maneja el clic en una lección
   */
  const handleLessonClick = (levelId, lessonId, status) => {
    if (status === 'available' || status === 'completed') {
      navigate(`/lesson/${levelId}/${lessonId}`);
    }
  };

  /**
   * Calcula el progreso total
   */
  const calculateTotalProgress = () => {
    let totalLessons = 0;
    let completedLessons = 0;

    levels.forEach(level => {
      totalLessons += level.lessons.length;
      const completed = progress.completedLessons[level.id] || [];
      completedLessons += completed.length;
    });

    return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  };

  const totalProgress = calculateTotalProgress();

  return (
    <div className="level-map-container">
      {/* Mini-mapa de progreso global */}
      <div className="level-map-header">
        <div className="progress-summary">
          <h2>Tu Progreso</h2>
          <div className="global-progress-bar">
            <div 
              className="global-progress-fill" 
              style={{ width: `${totalProgress}%` }}
            >
              <span className="progress-text">{totalProgress}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mapa de niveles */}
      <div className="level-map">
        {levels.map((level, levelIndex) => {
          const levelUnlocked = isLevelUnlocked(level.id);
          const levelCompleted = isLevelCompleted(level.id);
          const completedCount = (progress.completedLessons[level.id] || []).length;

          return (
            <div 
              key={level.id} 
              className={`level-column ${levelUnlocked ? 'unlocked' : 'locked'} ${levelCompleted ? 'completed' : ''}`}
            >
              {/* Encabezado del nivel */}
              <div className="level-header">
                <div className="level-title-wrapper">
                  <h3 className="level-title">{level.title}</h3>
                  {levelCompleted && (
                    <span className="level-completed-badge">🎉</span>
                  )}
                  {!levelUnlocked && (
                    <span className="level-locked-icon">🔒</span>
                  )}
                </div>
                <p className="level-description">{level.description}</p>
                <div className="level-progress-text">
                  {completedCount}/{level.lessons.length} lecciones
                </div>
              </div>

              {/* Nodos de lecciones */}
              <div className="lessons-path">
                {level.lessons.map((lesson, lessonIndex) => {
                  const status = getLessonStatus(level.id, lesson.id);
                  const isLast = lessonIndex === level.lessons.length - 1;
                  const icon = getLessonIcon(status, lessonIndex);

                  return (
                    <div key={lesson.id} className="lesson-node-wrapper">
                      {/* Línea conectora (excepto para la última lección) */}
                      {!isLast && (
                        <div 
                          className={`lesson-connector ${status === 'completed' ? 'completed' : status === 'available' ? 'available' : 'locked'}`}
                        ></div>
                      )}

                      {/* Nodo de lección */}
                      <div
                        className={`lesson-node ${status} ${hoveredLesson === lesson.id ? 'hovered' : ''}`}
                        onClick={() => handleLessonClick(level.id, lesson.id, status)}
                        onMouseEnter={() => setHoveredLesson(lesson.id)}
                        onMouseLeave={() => setHoveredLesson(null)}
                        title={lesson.title}
                      >
                        <div className="lesson-icon">{icon}</div>
                        {status === 'available' && (
                          <div className="lesson-pulse"></div>
                        )}
                      </div>

                      {/* Tooltip con nombre de lección */}
                      {hoveredLesson === lesson.id && (
                        <div className="lesson-tooltip">
                          {lesson.title}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Conector entre niveles (excepto para el último nivel) */}
              {levelIndex < levels.length - 1 && (
                <div className={`level-connector ${levelCompleted ? 'completed' : 'locked'}`}>
                  <div className="level-connector-line"></div>
                  {levelCompleted && (
                    <div className="level-connector-arrow">↓</div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Botón flotante para volver al inicio */}
      <button 
        className="floating-home-button"
        onClick={() => navigate('/')}
        title="Volver al inicio"
      >
        🏠
      </button>
    </div>
  );
}

