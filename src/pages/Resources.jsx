import { useState, useEffect } from 'react';
import ResourceCard from '../components/ResourceCard.jsx';
import { financialResources, getResourcesByCategory, getCategories, getCategoryName } from '../data/resources.js';
import { getResourcesCategory, saveResourcesCategory } from '../utils/storage.js';

/**
 * Página dedicada a recursos de aprendizaje
 * Muestra todos los recursos educativos disponibles con filtros por categoría
 * La categoría seleccionada se guarda en localStorage
 */
export default function Resources() {
  const [selectedCategory, setSelectedCategory] = useState(() => getResourcesCategory());

  // Guardar en localStorage cuando cambie la categoría
  useEffect(() => {
    saveResourcesCategory(selectedCategory);
  }, [selectedCategory]);

  const categories = getCategories();
  const filteredResources = getResourcesByCategory(selectedCategory);

  return (
    <div className="page resources-page">
      <div className="resources-header">
        <h1>📚 Recursos de Aprendizaje</h1>
        <p className="page-description">
          Profundiza en temas financieros con estos recursos adicionales. 
          Explora documentación, videos, podcasts, herramientas y más.
        </p>
      </div>

      {/* Filtros por categoría */}
      <div className="resource-filters">
        <button
          className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('all')}
        >
          Todos ({financialResources.length})
        </button>
        {categories.map(category => {
          const count = financialResources.filter(r => r.category === category).length;
          return (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {getCategoryName(category)} ({count})
            </button>
          );
        })}
      </div>

      {/* Grid de recursos */}
      {filteredResources.length > 0 ? (
        <div className="resources-grid">
          {filteredResources.map(resource => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      ) : (
        <div className="no-resources-container">
          <p className="no-resources">No hay recursos disponibles en esta categoría.</p>
        </div>
      )}

      {/* Información adicional */}
      <div className="resources-info">
        <div className="info-card">
          <h3>💡 ¿Cómo usar estos recursos?</h3>
          <ul>
            <li>Filtra por categoría para encontrar el tipo de contenido que buscas</li>
            <li>Cada recurso está marcado con su nivel de dificultad</li>
            <li>Los recursos externos se abrirán en una nueva pestaña</li>
            <li>Completa las lecciones para desbloquear más recursos recomendados</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

