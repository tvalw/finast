import { useState } from 'react';

/**
 * Componente de tarjeta para mostrar un recurso educativo
 * 
 * Muestra información del recurso y permite acceder al link externo
 */
export default function ResourceCard({ resource }) {
  const [isHovered, setIsHovered] = useState(false);

  /**
   * Obtiene el color del badge según la categoría
   */
  const getCategoryColor = (category) => {
    const colors = {
      documentation: "#667eea",
      videos: "#e74c3c",
      podcasts: "#9b59b6",
      tools: "#00b894",
      books: "#f39c12",
      courses: "#0984e3"
    };
    return colors[category] || "#667eea";
  };

  /**
   * Obtiene el nombre de la categoría en español
   */
  const getCategoryName = (category) => {
    const names = {
      documentation: "Documentación",
      videos: "Videos",
      podcasts: "Podcasts",
      tools: "Herramientas",
      books: "Libros",
      courses: "Cursos"
    };
    return names[category] || category;
  };

  /**
   * Obtiene el color del badge según el nivel
   */
  const getLevelColor = (level) => {
    const colors = {
      "Principiante": "#00b894",
      "Intermedio": "#0984e3",
      "Avanzado": "#e74c3c"
    };
    return colors[level] || "#667eea";
  };

  /**
   * Maneja el clic en el botón de acceso
   */
  const handleAccess = () => {
    if (resource.link) {
      window.open(resource.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div 
      className="resource-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
        transition: 'all 0.3s ease'
      }}
    >
      {/* Badge de categoría */}
      <div 
        className="resource-category-badge"
        style={{ backgroundColor: getCategoryColor(resource.category) }}
      >
        {resource.icon} {getCategoryName(resource.category)}
      </div>

      {/* Contenido de la tarjeta */}
      <div className="resource-card-content">
        <h3 className="resource-title">{resource.title}</h3>
        <p className="resource-description">{resource.description}</p>

        {/* Información adicional */}
        <div className="resource-info">
          <span 
            className="resource-level"
            style={{ backgroundColor: getLevelColor(resource.level) }}
          >
            {resource.level}
          </span>
          <span className="resource-duration">⏱️ {resource.duration}</span>
        </div>

        {/* Botón de acceso */}
        <button 
          className="resource-access-btn"
          onClick={handleAccess}
          style={{ 
            backgroundColor: getCategoryColor(resource.category),
            opacity: isHovered ? 1 : 0.9
          }}
        >
          Acceder →
        </button>
      </div>
    </div>
  );
}

