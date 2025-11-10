import { useNavigate } from 'react-router-dom';

/**
 * Tarjeta de recomendación personalizada
 */
export default function RecommendationCard({ recommendation }) {
  const navigate = useNavigate();

  const handleAction = () => {
    if (recommendation.level && recommendation.lesson) {
      navigate(`/lesson/${recommendation.level}/${recommendation.lesson}`);
    } else if (recommendation.level) {
      navigate('/levels');
    } else {
      navigate('/levels');
    }
  };

  const getBadgeColor = (type) => {
    const colors = {
      beginner: '#10b981',
      progress: '#6366f1',
      motivation: '#f59e0b'
    };
    return colors[type] || '#6366f1';
  };

  const getBadgeText = (type) => {
    const texts = {
      beginner: 'Para principiantes',
      progress: 'Basado en tu progreso',
      motivation: 'Motivación'
    };
    return texts[type] || 'Recomendado';
  };

  return (
    <div className="rec-card">
      <span 
        className="rec-badge"
        style={{ backgroundColor: getBadgeColor(recommendation.type) }}
      >
        {getBadgeText(recommendation.type)}
      </span>
      <h4>{recommendation.title}</h4>
      <p>{recommendation.description}</p>
      <button 
        className="rec-button"
        onClick={handleAction}
        style={{ backgroundColor: getBadgeColor(recommendation.type) }}
      >
        {recommendation.action}
      </button>
    </div>
  );
}

