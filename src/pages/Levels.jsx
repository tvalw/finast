import { levels } from '../data/levels.js';
import LevelCard from '../components/LevelCard.jsx';

/**
 * Página que muestra la lista de todos los niveles disponibles
 */
export default function Levels() {
  return (
    <div className="page levels-page">
      <h1>Niveles de Aprendizaje</h1>
      <p className="page-description">
        Completa las lecciones de cada nivel para desbloquear el siguiente.
      </p>
      
      <div className="levels-grid">
        {levels.map(level => (
          <LevelCard key={level.id} level={level} />
        ))}
      </div>
    </div>
  );
}

