import LevelMap from '../components/LevelMap.jsx';

/**
 * Página que muestra el mapa visual interactivo de niveles
 */
export default function Levels() {
  return (
    <div className="page levels-page">
      <h1>Niveles de Aprendizaje</h1>
      <p className="page-description">
        Completa las lecciones de cada nivel para desbloquear el siguiente.
      </p>
      
      <LevelMap />
    </div>
  );
}

