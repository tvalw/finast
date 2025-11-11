import { useNavigate } from 'react-router-dom';
import { setMode } from '../utils/storage.js';

/**
 * Página de selección de modo de aprendizaje
 * Permite al usuario elegir entre tres modos: Relajado, Competitivo y Aprendizaje
 */
export default function ModeSelect() {
  const navigate = useNavigate();

  const modes = [
    {
      id: 'relaxed',
      title: '🌿 Modo Relajado',
      description: 'Aprende a tu ritmo sin presión ni puntaje. Ideal para repasar y explorar conceptos sin estrés.',
      color: '#10b981',
      bgColor: 'rgba(16, 185, 129, 0.1)',
      borderColor: '#10b981',
      features: [
        'Sin presión de tiempo',
        'Ideal para repasar',
        'Aprende a tu ritmo'
      ]
    },
    {
      id: 'competitive',
      title: '⚡ Modo Competitivo',
      description: 'Pon a prueba tus conocimientos, gana puntos y mejora tu récord. Activa el temporizador y desafía tu propio récord.',
      color: '#f59e0b',
      bgColor: 'rgba(245, 158, 11, 0.1)',
      borderColor: '#f59e0b',
      features: [
        'Temporizador activo',
        'Desafía tu récord',
        'Competitivo y dinámico'
      ]
    },
    {
      id: 'learning',
      title: '📘 Modo Aprendizaje',
      description: 'Explora las preguntas y mira las respuestas correctas antes de responder. Perfecto para entender conceptos nuevos.',
      color: '#6366f1',
      bgColor: 'rgba(99, 102, 241, 0.1)',
      borderColor: '#6366f1',
      features: [
        'Ver respuestas correctas',
        'Sin penalización',
        'Enfoque educativo',
        'Aprende sin presión'
      ]
    }
  ];

  const handleSelect = (modeId) => {
    setMode(modeId);
    navigate('/levels');
  };

  return (
    <div className="page mode-select-page">
      <div className="mode-select-container">
        <div className="mode-select-header">
          <h1>Elige tu modo de aprendizaje</h1>
          <p className="mode-select-subtitle">
            Selecciona el modo que mejor se adapte a tu estilo de aprendizaje
          </p>
        </div>

        <div className="modes-grid">
          {modes.map((mode) => (
            <div
              key={mode.id}
              className="mode-card"
              onClick={() => handleSelect(mode.id)}
              style={{
                borderColor: mode.borderColor,
                background: `linear-gradient(135deg, ${mode.bgColor} 0%, rgba(255, 255, 255, 0.5) 100%)`
              }}
            >
              <div className="mode-card-header">
                <h2 className="mode-title">{mode.title}</h2>
              </div>
              <p className="mode-description">{mode.description}</p>
              <ul className="mode-features">
                {mode.features.map((feature, index) => (
                  <li key={index} className="mode-feature">
                    <span className="feature-icon">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className="mode-select-btn"
                style={{
                  background: mode.color,
                  borderColor: mode.color
                }}
              >
                Seleccionar
              </button>
            </div>
          ))}
        </div>

        <div className="mode-select-footer">
          <p className="mode-note">
            💡 Puedes cambiar de modo en cualquier momento desde tu perfil o el menú principal
          </p>
        </div>
      </div>
    </div>
  );
}

