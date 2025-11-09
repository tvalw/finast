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
  const [levelUnlocked, setLevelUnlocked] = useState(null); // Nivel desbloqueado (para notificación)
  const [showLevelUnlockedNotification, setShowLevelUnlockedNotification] = useState(false);
  const [questionKey, setQuestionKey] = useState(0); // Key para forzar reset del QuestionCard

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
        
        // En modo repaso, solo avanzar si la respuesta es correcta
        setTimeout(() => {
          // Verificar si hay más preguntas en la lista actual
          if (currentQuestionIndex < questionsToShow.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
          } else {
            // Terminó de revisar todas las incorrectas actuales
            // El useEffect se encargará de actualizar questionsToShow con las que aún quedan
            // Si no quedan incorrectas, el useEffect llamará a completeLesson
            setCurrentQuestionIndex(0);
          }
        }, 2000);
      } else {
        // Modo normal - avanzar a la siguiente pregunta
        setTimeout(() => {
          if (currentQuestionIndex < lesson.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
          } else {
            // Última pregunta completada, verificar si hay incorrectas
            checkRemainingIncorrect();
          }
        }, 2000);
      }
    } else {
      // Si es incorrecta, agregar a la lista de incorrectas (si no está ya)
      setIncorrectQuestions(prev => {
        const updated = !prev.includes(originalIndex) 
          ? [...prev, originalIndex]
          : prev;
        
        // En modo repaso, NO avanzar si la respuesta es incorrecta
        // La pregunta se quedará en pantalla hasta que se responda correctamente
        if (isReviewMode) {
          // En modo repaso, si la respuesta es incorrecta, resetear el QuestionCard
          // para permitir intentar de nuevo sin avanzar
          setTimeout(() => {
            setQuestionKey(prevKey => prevKey + 1);
          }, 2000);
        } else {
          // En modo normal, avanzar a la siguiente pregunta incluso si es incorrecta
          setTimeout(() => {
            if (currentQuestionIndex < lesson.questions.length - 1) {
              setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            } else {
              // Última pregunta completada, verificar si hay incorrectas
              // Usar el estado actualizado 'updated' para verificar
              if (updated.length > 0) {
                // Crear array de preguntas incorrectas para mostrar
                const incorrectQuestionsList = updated.map(idx => lesson.questions[idx]);
                setQuestionsToShow(incorrectQuestionsList);
                setCurrentQuestionIndex(0);
                setIsReviewMode(true);
              } else {
                // No hay incorrectas, completar lección
                completeLesson();
              }
            }
          }, 2000);
        }
        
        return updated;
      });
    }
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
    const nextLevelId = parseInt(levelId) + 1;
    const wasUnlocked = checkAndUnlockNextLevel(parseInt(levelId));
    
    // Si se desbloqueó un nuevo nivel, mostrar notificación
    if (wasUnlocked) {
      const nextLevel = levels.find(l => l.id === nextLevelId);
      if (nextLevel) {
        setLevelUnlocked(nextLevel);
        setShowLevelUnlockedNotification(true);
        // Ocultar notificación después de 5 segundos
        setTimeout(() => {
          setShowLevelUnlockedNotification(false);
        }, 5000);
      }
    }
    
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

  const handleRepeatLesson = () => {
    // Reiniciar el estado para repetir la lección
    setCurrentQuestionIndex(0);
    setCompleted(false);
    setPointsEarned(0);
    setShowCelebration(false);
    setIncorrectQuestions([]);
    setIsReviewMode(false);
    setQuestionsToShow(lesson.questions);
    setLevelUnlocked(null);
    setShowLevelUnlockedNotification(false);
    setQuestionKey(0);
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
        
        {/* Notificación de nivel desbloqueado */}
        {showLevelUnlockedNotification && levelUnlocked && (
          <div className="level-unlocked-notification">
            <div className="level-unlocked-content">
              <div className="level-unlocked-icon">🎉</div>
              <div className="level-unlocked-text">
                <h3>¡Nuevo Nivel Desbloqueado!</h3>
                <p>{levelUnlocked.title}</p>
              </div>
              <button 
                className="level-unlocked-close"
                onClick={() => setShowLevelUnlockedNotification(false)}
              >
                ✕
              </button>
            </div>
          </div>
        )}
        
        <div className="lesson-completed">
          <div className="completion-card">
            <h2>✅ ¡Lección Completada!</h2>
            <p>Has ganado {pointsEarned} puntos</p>
            <div className="completion-actions">
              <button className="btn btn-primary" onClick={handleNextLesson}>
                Siguiente lección
              </button>
              <button className="btn btn-secondary" onClick={handleRepeatLesson}>
                🔄 Repetir lección
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
        key={`${currentQuestion.id}-${questionKey}`}
        question={currentQuestion} 
        onAnswer={handleAnswer}
      />
    </div>
  );
}

