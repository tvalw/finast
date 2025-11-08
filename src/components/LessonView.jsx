import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { levels } from '../data/levels.js';
import QuestionCard from './QuestionCard.jsx';
import { 
  addPoints, 
  markLessonCompleted, 
  saveLastLesson 
} from '../utils/storage.js';
import { checkAndUnlockNextLevel } from '../utils/progress.js';

/**
 * Componente que muestra una lección completa
 * Muestra las preguntas una por una y maneja el progreso
 */
export default function LessonView() {
  const { levelId, lessonId } = useParams();
  const navigate = useNavigate();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [lesson, setLesson] = useState(null);
  const [level, setLevel] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);

  useEffect(() => {
    // Buscar el nivel y la lección
    const foundLevel = levels.find(l => l.id === parseInt(levelId));
    if (foundLevel) {
      setLevel(foundLevel);
      const foundLesson = foundLevel.lessons.find(l => l.id === lessonId);
      if (foundLesson) {
        setLesson(foundLesson);
        // Guardar como última lección vista
        saveLastLesson(parseInt(levelId), lessonId);
      } else {
        // Lección no encontrada, redirigir a niveles
        navigate('/levels');
      }
    } else {
      navigate('/levels');
    }
  }, [levelId, lessonId, navigate]);

  const handleAnswer = (isCorrect, explanation) => {
    if (isCorrect) {
      const points = 10; // 10 puntos por pregunta correcta
      addPoints(points);
      setPointsEarned(prev => prev + points);
    }
    
    // Esperar un momento antes de pasar a la siguiente pregunta
    setTimeout(() => {
      if (currentQuestionIndex < lesson.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        // Última pregunta completada
        completeLesson();
      }
    }, 2000); // 2 segundos para leer la explicación
  };

  const completeLesson = () => {
    // Marcar lección como completada
    markLessonCompleted(parseInt(levelId), lessonId);
    
    // Verificar si se completó el nivel y desbloquear el siguiente
    checkAndUnlockNextLevel(parseInt(levelId));
    
    setCompleted(true);
  };

  const handleNextLesson = () => {
    // Buscar la siguiente lección en el mismo nivel
    if (!level || !lesson) return;
    
    const currentIndex = level.lessons.findIndex(l => l.id === lessonId);
    if (currentIndex < level.lessons.length - 1) {
      // Hay siguiente lección en el mismo nivel
      const nextLesson = level.lessons[currentIndex + 1];
      navigate(`/lesson/${levelId}/${nextLesson.id}`);
    } else {
      // No hay más lecciones, volver a niveles
      navigate('/levels');
    }
  };

  const handleBackToLevels = () => {
    navigate('/levels');
  };

  if (!lesson) {
    return <div className="loading">Cargando lección...</div>;
  }

  if (completed) {
    return (
      <div className="lesson-completed">
        <div className="completion-card">
          <h2>✅ ¡Lección Completada!</h2>
          <p>Has ganado {pointsEarned} puntos</p>
          <div className="completion-actions">
            <button className="btn btn-primary" onClick={handleNextLesson}>
              Siguiente lección
            </button>
            <button className="btn btn-secondary" onClick={handleBackToLevels}>
              Volver a niveles
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = lesson.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / lesson.questions.length) * 100;

  return (
    <div className="lesson-view">
      <div className="lesson-header">
        <h2>{lesson.title}</h2>
        <div className="lesson-progress-bar">
          <div 
            className="lesson-progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p>Pregunta {currentQuestionIndex + 1} de {lesson.questions.length}</p>
      </div>
      
      <QuestionCard 
        key={currentQuestion.id || currentQuestionIndex}
        question={currentQuestion} 
        onAnswer={handleAnswer}
      />
    </div>
  );
}

