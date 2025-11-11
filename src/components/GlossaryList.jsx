import { useState } from 'react';
import { searchTerms } from '../data/glossary.js';
import { getMostViewedTerms, addViewedTerm } from '../utils/storage.js';

/**
 * Componente que muestra la lista de términos del diccionario
 * Incluye búsqueda, expansión de términos y términos más vistos
 */
export default function GlossaryList({ searchQuery = '' }) {
  const [expandedTerms, setExpandedTerms] = useState(new Set());
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem('finast-glossary-favorites');
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Obtener términos filtrados
  const filteredTerms = searchQuery ? searchTerms(searchQuery) : searchTerms('');
  
  // Obtener términos más vistos
  const mostViewed = getMostViewedTerms();

  // Ordenar términos alfabéticamente
  const sortedTerms = [...filteredTerms].sort((a, b) => 
    a.term.localeCompare(b.term, 'es')
  );

  const toggleExpanded = (term) => {
    const newExpanded = new Set(expandedTerms);
    if (newExpanded.has(term)) {
      newExpanded.delete(term);
    } else {
      newExpanded.add(term);
      // Registrar visualización
      addViewedTerm(term);
    }
    setExpandedTerms(newExpanded);
  };

  const toggleFavorite = (term, e) => {
    e.stopPropagation(); // Evitar que se expanda el término
    const newFavorites = new Set(favorites);
    if (newFavorites.has(term)) {
      newFavorites.delete(term);
    } else {
      newFavorites.add(term);
    }
    setFavorites(newFavorites);
    try {
      localStorage.setItem('finast-glossary-favorites', JSON.stringify([...newFavorites]));
    } catch (error) {
      console.error('Error al guardar favoritos:', error);
    }
  };

  // Filtrar términos más vistos que están en los resultados actuales
  const visibleMostViewed = mostViewed
    .filter(item => sortedTerms.some(t => t.term === item.term))
    .slice(0, 5);

  return (
    <div className="glossary-list-container">
      {/* Términos más vistos */}
      {visibleMostViewed.length > 0 && !searchQuery && (
        <div className="most-viewed-section">
          <h3 className="section-title">🔝 Más Consultados</h3>
          <div className="most-viewed-cards">
            {visibleMostViewed.map(item => {
              const termData = sortedTerms.find(t => t.term === item.term);
              if (!termData) return null;
              const isExpanded = expandedTerms.has(termData.term);
              return (
                <div 
                  key={termData.term} 
                  className={`glossary-card most-viewed ${isExpanded ? 'expanded' : ''}`}
                  onClick={() => toggleExpanded(termData.term)}
                >
                  <div className="term-header">
                    <div className="term-icon-title">
                      <span className="term-icon">{termData.icon}</span>
                      <div className="term-info">
                        <h4 className="term-name">{termData.term}</h4>
                        <span className="view-count">👁️ {item.views} consultas</span>
                      </div>
                    </div>
                    <button
                      className={`favorite-btn ${favorites.has(termData.term) ? 'active' : ''}`}
                      onClick={(e) => toggleFavorite(termData.term, e)}
                      title={favorites.has(termData.term) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                    >
                      ⭐
                    </button>
                  </div>
                  {isExpanded && (
                    <div className="term-definition">
                      <p>{termData.definition}</p>
                      <div className="educational-note">
                        <span className="note-icon">💡</span>
                        <span className="note-text">
                          Comprender este concepto te ayudará a tomar mejores decisiones financieras.
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Lista completa de términos */}
      <div className="all-terms-section">
        {!searchQuery && (
          <h3 className="section-title">
            📘 Todos los Términos ({sortedTerms.length})
          </h3>
        )}
        {searchQuery && (
          <h3 className="section-title">
            🔍 Resultados de búsqueda ({sortedTerms.length})
          </h3>
        )}
        
        {sortedTerms.length === 0 ? (
          <div className="no-results">
            <p>No se encontraron términos que coincidan con tu búsqueda.</p>
            <p className="suggestion">Intenta con otras palabras clave.</p>
          </div>
        ) : (
          <div className="glossary-grid">
            {sortedTerms.map((item) => {
              const isExpanded = expandedTerms.has(item.term);
              const isFavorite = favorites.has(item.term);
              return (
                <div
                  key={item.term}
                  className={`glossary-card ${isExpanded ? 'expanded' : ''} ${isFavorite ? 'favorite' : ''}`}
                  onClick={() => toggleExpanded(item.term)}
                >
                  <div className="term-header">
                    <div className="term-icon-title">
                      <span className="term-icon">{item.icon}</span>
                      <h4 className="term-name">{item.term}</h4>
                    </div>
                    <div className="term-actions">
                      <button
                        className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                        onClick={(e) => toggleFavorite(item.term, e)}
                        title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                      >
                        ⭐
                      </button>
                      <span className="expand-icon">
                        {isExpanded ? '▼' : '▶'}
                      </span>
                    </div>
                  </div>
                  {isExpanded && (
                    <div className="term-definition">
                      <p>{item.definition}</p>
                      <div className="educational-note">
                        <span className="note-icon">💡</span>
                        <span className="note-text">
                          Comprender este concepto te ayudará a tomar mejores decisiones financieras.
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

