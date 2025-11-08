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
import { getHomeResourcesCategory, saveHomeResourcesCategory } from '../utils/storage.js';

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

    window.addEventListener('finast:pointsUpdated', handlePointsUpdate);
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('finast:pointsUpdated', handlePointsUpdate);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

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
