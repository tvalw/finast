import { Link, useNavigate } from 'react-router-dom';
import ProgressPanel from '../components/ProgressPanel.jsx';
import { getLastLesson } from '../utils/storage.js';

/**
 * Página de inicio / Dashboard
 * Muestra un saludo, el progreso general y un botón para continuar
 */
export default function Home() {
  const navigate = useNavigate();
  const lastLesson = getLastLesson();

  const handleContinue = () => {
    if (lastLesson) {
      navigate(`/lesson/${lastLesson.levelId}/${lastLesson.lessonId}`);
    } else {
      navigate('/levels');
    }
  };

  return (
    <div className="page home-page">
      <div className="home-content">
        <h1>Hola 👋, sigue aprendiendo sobre finanzas.</h1>
        
        <ProgressPanel />
        
        <div className="home-actions">
          <button className="btn btn-primary btn-large" onClick={handleContinue}>
            {lastLesson ? 'Continuar donde quedaste' : 'Comenzar a aprender'}
          </button>
          
          <Link to="/levels" className="btn btn-secondary btn-large">
            Ver todos los niveles
          </Link>
        </div>
      </div>
    </div>
  );
}

