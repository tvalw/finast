import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuestionCard from './QuestionCard.jsx';
import CelebrationModal from './CelebrationModal.jsx';
import { levels } from '../data/levels.js';
import { 
  addPoints, 
  markLessonCompleted
} from '../utils/storage.js';
import { checkAndUnlockNextLevel } from '../utils/progress.js';

/**
 * Componente que maneja el quiz de una lección
 * Muestra las preguntas una por una y maneja el progreso
 */
export default function QuizFromLesson({ lesson, level }) {
  const { levelId, lessonId } = useParams();
  const navigate = useNavigate();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [incorrectQuestions, setIncorrectQuestions] = useState([]); // Índices de preguntas incorrectas
  const [isReviewMode, setIsReviewMode] = useState(false); // Modo de repaso de preguntas incorrectas
  const [questionsToShow, setQuestionsToShow] = useState(lesson.questions); // Preguntas que se están mostrando actualmente

  // Reiniciar estado cuando cambia la lección
  useEffect(() => {
    setCurrentQuestionIndex(0);
    setCompleted(false);
    setPointsEarned(0);
    setShowCelebration(false);
    setIncorrectQuestions([]);
    setIsReviewMode(false);
    setQuestionsToShow(lesson.questions);
  }, [lessonId]);

  // Actualizar preguntas a mostrar cuando cambian las incorrectas en modo repaso
  useEffect(() => {
    if (isReviewMode && !completed) {
      if (incorrectQuestions.length > 0) {
        const incorrectQuestionsList = incorrectQuestions.map(idx => lesson.questions[idx]);
        setQuestionsToShow(incorrectQuestionsList);
        // Si el índice actual es mayor que el nuevo tamaño, resetearlo
        setCurrentQuestionIndex(prev => {
          if (prev >= incorrectQuestionsList.length) {
            return 0;
          }
          return prev;
        });
      } else if (incorrectQuestions.length === 0) {
        // No quedan incorrectas, completar lección
        completeLesson();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [incorrectQuestions, isReviewMode, lesson.questions]);

  const handleAnswer = (isCorrect, explanation) => {
    const currentQuestion = isReviewMode ? questionsToShow[currentQuestionIndex] : lesson.questions[currentQuestionIndex];
    const originalIndex = lesson.questions.findIndex(q => q.id === currentQuestion.id);
    
    if (isCorrect) {
      const points = 10; // 10 puntos por pregunta correcta
      addPoints(points);
      setPointsEarned(prev => prev + points);
      
      // Si está en modo repaso, remover la pregunta de las incorrectas
      if (isReviewMode) {
        setIncorrectQuestions(prev => prev.filter(idx => idx !== originalIndex));
      }
    } else {
      // Si es incorrecta, agregar a la lista de incorrectas (si no está ya)
      setIncorrectQuestions(prev => {
        if (!prev.includes(originalIndex)) {
          return [...prev, originalIndex];
        }
        return prev;
      });
    }
    
    // Esperar un momento antes de pasar a la siguiente pregunta
    setTimeout(() => {
      if (isReviewMode) {
        // En modo repaso, verificar si hay más preguntas en la lista actual
        if (currentQuestionIndex < questionsToShow.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
        } else {
          // Terminó de revisar todas las incorrectas actuales
          // El useEffect se encargará de actualizar questionsToShow con las que aún quedan
          // Si no quedan incorrectas, el useEffect llamará a completeLesson
          setCurrentQuestionIndex(0);
        }
      } else {
        // Modo normal
        if (currentQuestionIndex < lesson.questions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
        } else {
          // Última pregunta completada, verificar si hay incorrectas
          checkRemainingIncorrect();
        }
      }
    }, 2000); // 2 segundos para leer la explicación
  };

  const checkRemainingIncorrect = () => {
    // Si hay preguntas incorrectas, entrar en modo repaso
    if (incorrectQuestions.length > 0) {
      // Crear array de preguntas incorrectas para mostrar
      const incorrectQuestionsList = incorrectQuestions.map(idx => lesson.questions[idx]);
      setQuestionsToShow(incorrectQuestionsList);
      setCurrentQuestionIndex(0);
      setIsReviewMode(true);
    } else {
      // Todas las preguntas son correctas, completar lección
      completeLesson();
    }
  };

  const completeLesson = () => {
    // Marcar lección como completada
    markLessonCompleted(parseInt(levelId), lessonId);
    
    // Verificar si se completó el nivel y desbloquear el siguiente
    checkAndUnlockNextLevel(parseInt(levelId));
    
    // Mostrar modal de celebración
    setShowCelebration(true);
    setCompleted(true);
  };

  const handleNextLesson = () => {
    const currentLevelId = parseInt(levelId);
    
    // Buscar el nivel actual en los datos
    const currentLevel = levels.find(l => l.id === currentLevelId);
    if (!currentLevel) {
      navigate('/levels');
      return;
    }
    
    // Buscar el índice de la lección actual
    const currentLessonIndex = currentLevel.lessons.findIndex(l => l.id === lessonId);
    
    // Si hay siguiente lección en el mismo nivel
    if (currentLessonIndex >= 0 && currentLessonIndex < currentLevel.lessons.length - 1) {
      const nextLesson = currentLevel.lessons[currentLessonIndex + 1];
      navigate(`/lesson/${currentLevelId}/${nextLesson.id}`);
      return;
    }
    
    // Si no hay más lecciones en el nivel actual, buscar en el siguiente nivel
    const nextLevel = levels.find(l => l.id === currentLevelId + 1);
    if (nextLevel && nextLevel.lessons.length > 0) {
      const firstLessonOfNextLevel = nextLevel.lessons[0];
      navigate(`/lesson/${nextLevel.id}/${firstLessonOfNextLevel.id}`);
      return;
    }
    
    // No hay más lecciones, volver a niveles
    navigate('/levels');
  };

  const handleBackToLevels = () => {
    navigate('/levels');
  };

  const handleCloseCelebration = () => {
    setShowCelebration(false);
  };

  if (completed) {
    return (
      <>
        <CelebrationModal
          isOpen={showCelebration}
          onClose={handleCloseCelebration}
          pointsEarned={pointsEarned}
          levelId={parseInt(levelId)}
          lessonId={lessonId}
        />
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
      </>
    );
  }

  const currentQuestion = isReviewMode 
    ? questionsToShow[currentQuestionIndex] 
    : lesson.questions[currentQuestionIndex];
  
  const totalQuestions = isReviewMode 
    ? questionsToShow.length 
    : lesson.questions.length;
  
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="lesson-view">
      <div className="lesson-header">
        <h2>{lesson.title}</h2>
        {isReviewMode && (
          <div className="review-notice" style={{ 
            backgroundColor: '#fff3cd', 
            padding: '10px', 
            borderRadius: '5px', 
            marginBottom: '10px',
            textAlign: 'center'
          }}>
            <p style={{ margin: 0, fontWeight: 'bold', color: '#856404' }}>
              🔄 Repasando preguntas incorrectas ({incorrectQuestions.length} restantes)
            </p>
          </div>
        )}
        <div className="lesson-progress-bar">
          <div 
            className="lesson-progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p>Pregunta {currentQuestionIndex + 1} de {totalQuestions}</p>
      </div>
      
      <QuestionCard 
        key={currentQuestion.id || currentQuestionIndex}
        question={currentQuestion} 
        onAnswer={handleAnswer}
      />
    </div>
  );
}

