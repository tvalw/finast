import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDailyChallenge, getTimeRemaining, updateChallengeProgress } from '../../data/dailyChallenges.js';
import { getProgress } from '../../utils/storage.js';
import { addPoints } from '../../utils/storage.js';
import { isLevelCompleted } from '../../utils/progress.js';

/**
 * Componente del desafío diario mejorado
 * Muestra el desafío del día con progreso real y recompensas
 */
export default function DailyChallenge() {
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState(() => getDailyChallenge());
  const [timeRemaining, setTimeRemaining] = useState(() => getTimeRemaining());
  const [progress, setProgress] = useState(() => getProgress());

  // Actualizar el progreso del desafío basado en el progreso real del usuario
  useEffect(() => {
    const updateChallengeFromProgress = () => {
      const currentProgress = getProgress();
      setProgress(currentProgress);
      
      const currentChallenge = getDailyChallenge();
      if (!currentChallenge || currentChallenge.completed) {
        setChallenge(currentChallenge);
        return;
      }

      let newProgress = 0;

      switch (currentChallenge.type) {
        case 'lessons':
          // Contar todas las lecciones completadas
          let totalCompleted = 0;
          Object.values(currentProgress.completedLessons || {}).forEach(lessons => {
            totalCompleted += lessons.length;
          });
          newProgress = totalCompleted;
          break;
        
        case 'points':
          // Usar los puntos totales (simplificado para el desafío)
          newProgress = Math.min(currentProgress.points || 0, currentChallenge.target);
          break;
        
        case 'streak':
          // La racha se mantiene automáticamente
          newProgress = currentProgress.streak >= currentChallenge.target ? currentChallenge.target : currentProgress.streak || 0;
          break;
        
        case 'level':
          // Verificar si se completó un nivel completo
          const levels = [1, 2, 3, 4]; // IDs de niveles
          const completedLevels = levels.filter(levelId => isLevelCompleted(levelId));
          newProgress = completedLevels.length;
          break;
      }

      if (newProgress !== currentChallenge.progress && newProgress >= currentChallenge.progress) {
        const diff = newProgress - currentChallenge.progress;
        if (diff > 0) {
          updateChallengeProgress(currentChallenge.type, diff);
          const updatedChallenge = getDailyChallenge();
          setChallenge(updatedChallenge);

          // Si se completó el desafío, otorgar recompensa automáticamente
          if (updatedChallenge.completed && !currentChallenge.completed && updatedChallenge.reward) {
            addPoints(updatedChallenge.reward);
            window.dispatchEvent(new CustomEvent('finast:pointsUpdated'));
          }
        } else {
          setChallenge(currentChallenge);
        }
      } else {
        setChallenge(currentChallenge);
      }
    };

    updateChallengeFromProgress();

    // Escuchar eventos de actualización
    const handlePointsUpdate = () => {
      setTimeout(updateChallengeFromProgress, 100);
    };
    const handleStorageChange = () => {
      setTimeout(updateChallengeFromProgress, 100);
    };

    window.addEventListener('finast:pointsUpdated', handlePointsUpdate);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('finast:pointsUpdated', handlePointsUpdate);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Actualizar tiempo restante cada minuto
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(getTimeRemaining());
      // Verificar si cambió el día y actualizar el desafío
      const newChallenge = getDailyChallenge();
      if (newChallenge.date !== challenge.date) {
        setChallenge(newChallenge);
      }
    }, 60000); // Cada minuto

    return () => clearInterval(interval);
  }, [challenge.date]);

  const handleAccept = () => {
    // Navegar a niveles para comenzar
    navigate('/levels');
  };

  const handleClaimReward = () => {
    if (challenge.completed && challenge.reward) {
      addPoints(challenge.reward);
      window.dispatchEvent(new CustomEvent('finast:pointsUpdated'));
      // Marcar recompensa como reclamada
      const updatedChallenge = { ...challenge, rewardClaimed: true };
      try {
        localStorage.setItem('finast-daily-challenge', JSON.stringify(updatedChallenge));
        setChallenge(updatedChallenge);
      } catch (error) {
        console.error('Error al guardar desafío:', error);
      }
    }
  };

  if (!challenge) return null;

  const progressPercentage = Math.min((challenge.progress / challenge.target) * 100, 100);

  return (
    <div className="daily-challenge-content">
      <div className="challenge-header-inner">
        <div className="challenge-title-section">
          <span className="challenge-icon">{challenge.icon}</span>
          <h4 className="challenge-title">{challenge.title}</h4>
        </div>
        <span className="time-left">⏰ {timeRemaining}h</span>
      </div>
      
      <p className="challenge-description">{challenge.description}</p>
      
      {challenge.completed ? (
        <div className="challenge-completed-section">
          <div className="challenge-completed">
            <span className="completed-icon">✅</span>
            <div className="completed-info">
              <span className="completed-text">¡Desafío completado!</span>
              {challenge.reward && !challenge.rewardClaimed && (
                <span className="reward-text">Recompensa: +{challenge.reward} puntos</span>
              )}
            </div>
          </div>
          {challenge.reward && !challenge.rewardClaimed && (
            <button className="challenge-button claim-button" onClick={handleClaimReward}>
              🎁 Reclamar Recompensa
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="challenge-progress">
            <div className="challenge-progress-header">
              <span className="challenge-progress-label">Progreso</span>
              <span className="challenge-progress-text">
                {challenge.progress} / {challenge.target}
              </span>
            </div>
            <div className="challenge-progress-bar">
              <div 
                className="challenge-progress-fill"
                style={{ 
                  width: `${progressPercentage}%` 
                }}
              ></div>
            </div>
          </div>
          
          {challenge.reward && (
            <div className="challenge-reward">
              <span className="reward-badge">🎁 Recompensa: +{challenge.reward} puntos</span>
          </div>
          )}
          
          <button className="challenge-button" onClick={handleAccept}>
            {challenge.progress > 0 ? '▶ Continuar Desafío' : '▶ Comenzar Desafío'}
          </button>
        </>
      )}
    </div>
  );
}
