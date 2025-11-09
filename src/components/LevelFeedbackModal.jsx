import { useState } from 'react';

/**
 * Modal de feedback que se muestra al completar un nivel
 * Pregunta sobre la utilidad del módulo y qué fue confuso o aburrido
 */
export default function LevelFeedbackModal({ isOpen, onClose, levelId, levelTitle }) {
  const [rating, setRating] = useState(0);
  const [confusingOption, setConfusingOption] = useState('');
  const [otherText, setOtherText] = useState('');

  const confusingOptions = [
    {
      id: 'too-difficult',
      label: 'Fue muy difícil de entender'
    },
    {
      id: 'too-easy',
      label: 'Fue muy fácil, me aburrió'
    },
    {
      id: 'not-practical',
      label: 'No fue práctico o útil'
    }
  ];

  const handleSubmit = () => {
    // Guardar el feedback
    const feedback = {
      levelId,
      levelTitle,
      rating,
      confusing: confusingOption === 'other' ? otherText : confusingOption,
      timestamp: new Date().toISOString()
    };

    // Obtener feedbacks existentes
    const existingFeedbacks = JSON.parse(localStorage.getItem('finast-level-feedbacks') || '[]');
    existingFeedbacks.push(feedback);
    localStorage.setItem('finast-level-feedbacks', JSON.stringify(existingFeedbacks));

    // Cerrar el modal
    onClose();
  };

  const handleStarClick = (starIndex) => {
    setRating(starIndex + 1);
  };

  if (!isOpen) return null;

  return (
    <div className="feedback-modal-overlay" onClick={onClose}>
      <div className="feedback-modal" onClick={(e) => e.stopPropagation()}>
        <div className="feedback-modal-header">
          <h2>🎉 ¡Nivel Completado!</h2>
          <p className="feedback-level-title">{levelTitle}</p>
          <button className="feedback-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="feedback-modal-content">
          {/* Pregunta 1: Rating con estrellas */}
          <div className="feedback-question">
            <label className="feedback-question-label">
              ¿Qué tan útil fue este módulo?
            </label>
            <div className="stars-container">
              {[0, 1, 2, 3, 4].map((index) => (
                <button
                  key={index}
                  type="button"
                  className={`star-btn ${index < rating ? 'filled' : ''}`}
                  onClick={() => handleStarClick(index)}
                  aria-label={`${index + 1} estrella${index + 1 > 1 ? 's' : ''}`}
                >
                  ⭐
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="rating-text">
                {rating === 1 && 'No fue útil'}
                {rating === 2 && 'Poco útil'}
                {rating === 3 && 'Útil'}
                {rating === 4 && 'Muy útil'}
                {rating === 5 && 'Extremadamente útil'}
              </p>
            )}
          </div>

          {/* Pregunta 2: Qué fue confuso o aburrido */}
          <div className="feedback-question">
            <label className="feedback-question-label">
              ¿Qué fue lo más confuso o aburrido?
            </label>
            <div className="confusing-options">
              {confusingOptions.map((option) => (
                <label key={option.id} className="confusing-option">
                  <input
                    type="radio"
                    name="confusing"
                    value={option.id}
                    checked={confusingOption === option.id}
                    onChange={(e) => setConfusingOption(e.target.value)}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
              <label className="confusing-option">
                <input
                  type="radio"
                  name="confusing"
                  value="other"
                  checked={confusingOption === 'other'}
                  onChange={(e) => setConfusingOption(e.target.value)}
                />
                <span>Otros</span>
              </label>
            </div>
            
            {confusingOption === 'other' && (
              <textarea
                className="feedback-other-input"
                placeholder="Escribe aquí qué fue confuso o aburrido..."
                value={otherText}
                onChange={(e) => setOtherText(e.target.value)}
                rows={3}
              />
            )}
          </div>

          <div className="feedback-actions">
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={rating === 0 || (confusingOption === 'other' && !otherText.trim())}
            >
              Enviar Feedback
            </button>
            <button
              className="btn btn-secondary"
              onClick={onClose}
            >
              Omitir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

