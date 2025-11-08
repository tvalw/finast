import { useNavigate } from 'react-router-dom';

/**
 * Tarjeta de progreso que muestra dónde continuar el aprendizaje
 */
export default function ProgressCard({ currentLesson, progressPercentage }) {
  const navigate = useNavigate();

  const handleResume = () => {
    if (currentLesson) {
      navigate(`/lesson/${currentLesson.levelId}/${currentLesson.lessonId}`);
    } else {
      navigate('/levels');
    }
  };

  if (!currentLesson) {
    return (
      <div className="continue-card">
        <h3>¡Comienza tu Aprendizaje!</h3>
        <p>Explora los niveles disponibles y comienza tu primera lección</p>
        <button className="primary-button" onClick={() => navigate('/levels')}>
          ▶ Ver Niveles
        </button>
      </div>
    );
  }

  return (
    <div className="continue-card">
      <h3>Continúa donde quedaste</h3>
      <p className="lesson-info">
        <span className="level-badge">Nivel {currentLesson.levelId}</span>
        <span className="lesson-name">{currentLesson.lessonTitle}</span>
      </p>
      <button className="primary-button" onClick={handleResume}>
        ▶ Reanudar Lección
      </button>
      <div className="progress-bar-container">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <span className="progress-text">{progressPercentage}% completado</span>
      </div>
    </div>
  );
}

