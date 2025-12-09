import { useEffect, useState } from 'react';
import { getUnlockedBadges } from '../utils/progress.js';

/**
 * Componente modal de celebración que se muestra al completar una lección
 * 
 * Muestra:
 * - Animación de celebración (confeti/emoji)
 * - Puntos ganados (solo en modo competitivo)
 * - Insignia desbloqueada (si hay una nueva)
 * - Botón para continuar
 * 
 * @param {boolean} isOpen - Si el modal está abierto
 * @param {Function} onClose - Función para cerrar el modal
 * @param {number} pointsEarned - Puntos ganados en la lección
 * @param {number} levelId - ID del nivel completado
 * @param {string} lessonId - ID de la lección completada
 * @param {string} mode - Modo de aprendizaje ('relaxed', 'competitive', 'learning')
 */
export default function CelebrationModal({ isOpen, onClose, pointsEarned, levelId, lessonId, mode = 'competitive' }) {
  const [badges, setBadges] = useState([]);
  const [newBadge, setNewBadge] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Obtener badges actuales
      const currentBadges = getUnlockedBadges();
      setBadges(currentBadges);
      
      // Verificar si hay un nuevo badge (comparando con badges anteriores)
      // Por simplicidad, asumimos que el último badge es el nuevo
      if (currentBadges.length > 0) {
        const previousBadges = JSON.parse(localStorage.getItem('finast-previous-badges') || '[]');
        const newBadges = currentBadges.filter(b => 
          !previousBadges.some(pb => pb.id === b.id)
        );
        if (newBadges.length > 0) {
          setNewBadge(newBadges[0]);
        }
      }
      
      // Guardar badges actuales para la próxima comparación
      localStorage.setItem('finast-previous-badges', JSON.stringify(currentBadges));
      
      // Activar animación
      setShowAnimation(true);
      
      // Reproducir sonido de éxito (si existe)
      try {
        const audio = new Audio('/assets/sounds/correct.mp3');
        audio.volume = 0.3;
        audio.play().catch(() => {
          // Ignorar errores si el archivo no existe
        });
      } catch (error) {
        // Ignorar errores de audio
      }
      
      // Cerrar automáticamente después de 30 segundos
      const timeout = setTimeout(() => {
        onClose();
      }, 30000);
      
      return () => clearTimeout(timeout);
    }
  }, [isOpen, levelId, lessonId, onClose]);

  if (!isOpen) return null;

  return (
    <div className="celebration-overlay" onClick={onClose}>
      <div className="celebration-modal" onClick={(e) => e.stopPropagation()}>
        {showAnimation && (
          <div className="celebration-animation">
            <div className="confetti">🎉</div>
            <div className="confetti">✨</div>
            <div className="confetti">🎊</div>
            <div className="confetti">🌟</div>
            <div className="confetti">💫</div>
          </div>
        )}
        
        <div className="celebration-content">
          <h2 className="celebration-title">¡Felicidades! 🎉</h2>
          <p className="celebration-subtitle">Lección completada</p>
          
          {/* Mostrar puntos en todos los modos */}
          {pointsEarned > 0 && (
            <div className="celebration-points">
              <div className="points-icon">⭐</div>
              <div className="points-value">+{pointsEarned} puntos</div>
              {mode === 'competitive' && (
                <div className="points-bonus">⚡ Modo competitivo: puntos extra</div>
              )}
              {mode === 'relaxed' && (
                <div className="points-bonus">🌿 Modo relajado</div>
              )}
              {mode === 'learning' && (
                <div className="points-bonus">📘 Modo aprendizaje</div>
              )}
            </div>
          )}
          
          {newBadge && (
            <div className="celebration-badge">
              <div className="badge-icon-large">🏆</div>
              <div className="badge-info">
                <div className="badge-title">¡Nueva insignia desbloqueada!</div>
                <div className="badge-name">{newBadge.name}</div>
                <div className="badge-description">{newBadge.description}</div>
              </div>
            </div>
          )}
          
          <button className="btn btn-primary btn-large" onClick={onClose}>
            Seguir aprendiendo
          </button>
        </div>
      </div>
    </div>
  );
}

