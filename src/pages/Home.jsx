import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DailyStats from '../components/home/DailyStats.jsx';
import ProgressCard from '../components/home/ProgressCard.jsx';
import RecommendationCard from '../components/home/RecommendationCard.jsx';
import BadgeCarousel from '../components/home/BadgeCarousel.jsx';
import FloatingWidgets from '../components/home/FloatingWidgets.jsx';
import ResourceCard from '../components/ResourceCard.jsx';
import { getUser } from '../data/user.js';
import { getDailyStats, getCurrentLesson, getCurrentLessonProgress, getRecommendations } from '../utils/homeCalculations.js';
import { financialResources, getResourcesByCategory, getCategories, getCategoryName } from '../data/resources.js';
import { getHomeResourcesCategory, saveHomeResourcesCategory, getAcceptedChallenge, clearAcceptedChallenge, completeChallenge, isChallengeCompleted } from '../utils/storage.js';
import { getRandomTip } from '../data/financialTips.js';

/**
 * Página de inicio rediseñada con diseño moderno estilo Duolingo
 * Incluye hero section, estadísticas, progreso, recomendaciones y más
 */
export default function Home() {
  const [stats, setStats] = useState(() => getDailyStats());
  const [currentLesson, setCurrentLesson] = useState(() => getCurrentLesson());
  const [progressPercentage, setProgressPercentage] = useState(() => getCurrentLessonProgress());
  const [recommendations, setRecommendations] = useState(() => getRecommendations());
  const [user, setUser] = useState(() => getUser());
  const [selectedCategory, setSelectedCategory] = useState(() => getHomeResourcesCategory());
  const [dailyTip, setDailyTip] = useState(() => getRandomTip());
  const [acceptedChallenge, setAcceptedChallenge] = useState(() => getAcceptedChallenge());
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [rewardPoints, setRewardPoints] = useState(0);

  // Guardar categoría seleccionada en localStorage
  useEffect(() => {
    saveHomeResourcesCategory(selectedCategory);
  }, [selectedCategory]);

  // Actualizar datos cuando cambia el progreso
  useEffect(() => {
    const updateData = () => {
      setStats(getDailyStats());
      setCurrentLesson(getCurrentLesson());
      setProgressPercentage(getCurrentLessonProgress());
      setRecommendations(getRecommendations());
    };

    updateData();

    const handlePointsUpdate = () => updateData();
    const handleStorageChange = () => updateData();
    const handleFocus = () => updateData();

    const handleChallengeAccepted = () => {
      setAcceptedChallenge(getAcceptedChallenge());
    };

    const handleChallengeCleared = () => {
      setAcceptedChallenge(null);
    };

    window.addEventListener('finast:pointsUpdated', handlePointsUpdate);
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('finast:challengeAccepted', handleChallengeAccepted);
    window.addEventListener('finast:challengeCleared', handleChallengeCleared);

    return () => {
      window.removeEventListener('finast:pointsUpdated', handlePointsUpdate);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('finast:challengeAccepted', handleChallengeAccepted);
      window.removeEventListener('finast:challengeCleared', handleChallengeCleared);
    };
  }, []);

  const handleDismissChallenge = () => {
    clearAcceptedChallenge();
    setAcceptedChallenge(null);
  };

  const handleCompleteChallenge = () => {
    if (acceptedChallenge && !isChallengeCompleted(acceptedChallenge.id)) {
      const success = completeChallenge(acceptedChallenge.id, acceptedChallenge.rewardPoints || 0);
      if (success) {
        setRewardPoints(acceptedChallenge.rewardPoints || 0);
        setChallengeCompleted(true);
        setShowCompletionModal(true);
        // Limpiar el desafío después de completarlo
        setTimeout(() => {
          clearAcceptedChallenge();
          setAcceptedChallenge(null);
          setShowCompletionModal(false);
        }, 3000);
      }
    }
  };

  // Verificar si el desafío ya está completado al cargar
  useEffect(() => {
    if (acceptedChallenge) {
      setChallengeCompleted(isChallengeCompleted(acceptedChallenge.id));
    }
  }, [acceptedChallenge]);

  const categories = getCategories();
  const filteredResources = getResourcesByCategory(selectedCategory);

  return (
    <div className="page home-page-modern">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="welcome-message">
          <h1>¡Bienvenido de vuelta, {user.name}! 👋</h1>
          <p className="hero-subtitle">Tu progreso financiero hoy:</p>
        </div>
        
        <DailyStats stats={stats} />
      </section>

      {/* Desafío Semanal Aceptado - Recordatorio */}
      {acceptedChallenge && (
        <section className="accepted-challenge-reminder">
          <div className="challenge-reminder-card">
            <div className="challenge-reminder-header">
              <div className="challenge-reminder-title-section">
                <span className="challenge-reminder-icon">{acceptedChallenge.avatar}</span>
                <div>
                  <h3 className="challenge-reminder-title">Tu Desafío Semanal</h3>
                  <p className="challenge-reminder-label" style={{ color: acceptedChallenge.levelColor }}>
                    {acceptedChallenge.label}
                  </p>
                </div>
              </div>
              <button
                className="challenge-reminder-dismiss"
                onClick={handleDismissChallenge}
                title="Descartar recordatorio"
                aria-label="Descartar recordatorio"
              >
                ✕
              </button>
            </div>
            <h4 className="challenge-reminder-challenge-title">{acceptedChallenge.title}</h4>
            <p className="challenge-reminder-description">{acceptedChallenge.description}</p>
            <div className="challenge-reminder-footer">
              <span className="challenge-reminder-badge" style={{ 
                backgroundColor: `${acceptedChallenge.levelColor}20`,
                color: acceptedChallenge.levelColor,
                borderColor: acceptedChallenge.levelColor
              }}>
                Nivel: {acceptedChallenge.level}
              </span>
              <span className="challenge-reward-badge" style={{ 
                backgroundColor: `${acceptedChallenge.levelColor}20`,
                color: acceptedChallenge.levelColor,
                borderColor: acceptedChallenge.levelColor
              }}>
                💰 +{acceptedChallenge.rewardPoints || 0} puntos
              </span>
            </div>
            {!challengeCompleted ? (
              <button
                className="challenge-complete-btn"
                onClick={handleCompleteChallenge}
                style={{ 
                  background: `linear-gradient(135deg, ${acceptedChallenge.levelColor} 0%, ${acceptedChallenge.levelColor}dd 100%)`,
                  borderColor: acceptedChallenge.levelColor
                }}
              >
                ✅ Marcar como Completado
              </button>
            ) : (
              <div className="challenge-completed-message">
                <span className="completed-icon">✅</span>
                <span>¡Desafío completado! Has ganado {acceptedChallenge.rewardPoints || 0} puntos</span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Consejo Rápido del Día */}
      <section className="quick-tip-section">
        <div className="quick-tip-card">
          <div className="quick-tip-header">
            <span className="tip-emoji">{dailyTip.emoji}</span>
            <h3 className="tip-title">💡 Consejo Rápido</h3>
            <button 
              className="tip-refresh-btn" 
              onClick={() => setDailyTip(getRandomTip())}
              title="Ver otro consejo"
              aria-label="Ver otro consejo"
            >
              🔄
            </button>
          </div>
          <p className="tip-content">{dailyTip.tip}</p>
        </div>
      </section>

      {/* Modal de Completación de Desafío */}
      {showCompletionModal && (
        <div className="challenge-completion-modal-overlay">
          <div className="challenge-completion-modal">
            <div className="completion-modal-content">
              <div className="completion-icon">🎉</div>
              <h2 className="completion-title">¡Desafío Completado!</h2>
              <p className="completion-message">Has ganado</p>
              <div className="completion-points">
                <span className="points-amount">+{rewardPoints}</span>
                <span className="points-label">puntos</span>
              </div>
              <p className="completion-subtitle">¡Sigue así! 💪</p>
            </div>
          </div>
        </div>
      )}

      {/* Grid Principal */}
      <div className="home-grid">
        {/* Columna Principal */}
        <div className="home-column-main">
          {/* Sección de Progreso */}
          <section className="progress-section">
            <h2>Tu Camino de Aprendizaje</h2>
            <ProgressCard 
              currentLesson={currentLesson} 
              progressPercentage={progressPercentage}
            />
          </section>

          {/* Recomendaciones */}
          {recommendations.length > 0 && (
            <section className="recommendations">
              <h2>📚 Recomendado para ti</h2>
              <div className="recommendation-cards">
                {recommendations.map(rec => (
                  <RecommendationCard key={rec.id} recommendation={rec} />
                ))}
              </div>
            </section>
          )}

          {/* Logros e Insignias */}
          <section className="achievements-section">
            <h2>🏆 Tus Logros Recientes</h2>
            <BadgeCarousel />
          </section>
        </div>
      </div>

      {/* Elementos flotantes fijos */}
      <FloatingWidgets />

      {/* Recursos de Aprendizaje (sección completa) */}
      <section className="learning-resources">
        <h2>📚 Recursos de Aprendizaje Complementario</h2>
        <p className="resources-subtitle">
          Profundiza en temas financieros con estos recursos adicionales
        </p>

        {/* Filtros por categoría */}
        <div className="resource-filters">
          <button
            className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            Todos
          </button>
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {getCategoryName(category)}
            </button>
          ))}
        </div>

        {/* Grid de recursos */}
        <div className="resources-grid">
          {filteredResources.map(resource => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>

        {filteredResources.length === 0 && (
          <p className="no-resources">No hay recursos disponibles en esta categoría.</p>
        )}
      </section>
    </div>
  );
}
