import { useState, useEffect } from 'react';
import { getDailyChallenge, getTimeRemaining } from '../../data/dailyChallenges.js';

/**
 * Componente del desafío diario
 */
export default function DailyChallenge() {
  const [challenge, setChallenge] = useState(() => getDailyChallenge());
  const [timeRemaining, setTimeRemaining] = useState(() => getTimeRemaining());

  useEffect(() => {
    // Actualizar tiempo restante cada minuto
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
    // El desafío se acepta automáticamente al comenzar a usar la app
    // Aquí podríamos mostrar un mensaje de confirmación
    console.log('Desafío aceptado:', challenge.title);
  };

  if (!challenge) return null;

  return (
    <div className="daily-challenge-content">
      <div className="challenge-header-inner">
        <span className="time-left">⏰ {timeRemaining}h restantes</span>
      </div>
      
      <p className="challenge-description">{challenge.description}</p>
      
      {challenge.completed ? (
        <div className="challenge-completed">
          <span className="completed-icon">✅</span>
          <span>¡Desafío completado!</span>
        </div>
      ) : (
        <>
          <div className="challenge-progress">
            <div className="challenge-progress-bar">
              <div 
                className="challenge-progress-fill"
                style={{ 
                  width: `${(challenge.progress / challenge.target) * 100}%` 
                }}
              ></div>
            </div>
            <span className="challenge-progress-text">
              {challenge.progress} / {challenge.target}
            </span>
          </div>
          <button className="challenge-button" onClick={handleAccept}>
            {challenge.progress > 0 ? 'Continuar Desafío' : 'Aceptar Desafío'}
          </button>
        </>
      )}
    </div>
  );
}

