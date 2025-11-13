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
 * @param {Object} lesson - La lección actual
 * @param {Object} level - El nivel actual
 * @param {string} mode - Modo de aprendizaje: 'relaxed', 'competitive', o 'learning'
 */
export default function QuizFromLesson({ lesson, level, mode = 'competitive' }) {
  const { levelId, lessonId } = useParams();
  const navigate = useNavigate();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [incorrectQuestions, setIncorrectQuestions] = useState([]); // Índices de preguntas incorrectas
  const [isReviewMode, setIsReviewMode] = useState(false); // Modo de repaso de preguntas incorrectas
  const [questionsToShow, setQuestionsToShow] = useState(lesson?.questions || []); // Preguntas que se están mostrando actualmente
  const [levelUnlocked, setLevelUnlocked] = useState(null); // Nivel desbloqueado (para notificación)
  const [showLevelUnlockedNotification, setShowLevelUnlockedNotification] = useState(false);
  const [questionKey, setQuestionKey] = useState(0); // Key para forzar reset del QuestionCard

  // Reiniciar estado cuando cambia la lección
  useEffect(() => {
    if (!lesson || !lesson.questions) {
      return;
    }
    setCurrentQuestionIndex(0);
    setCompleted(false);
    setPointsEarned(0);
    setShowCelebration(false);
    setIncorrectQuestions([]);
    setIsReviewMode(false);
    setQuestionsToShow(lesson.questions);
  }, [lessonId, lesson]);

  // Actualizar preguntas a mostrar cuando cambian las incorrectas en modo repaso
  // Solo se ejecuta cuando se entra al modo repaso inicialmente, no en cada actualización
  useEffect(() => {
    if (!lesson || !lesson.questions || completed) {
      return;
    }
    if (isReviewMode && incorrectQuestions.length > 0) {
      const incorrectQuestionsList = incorrectQuestions.map(idx => lesson.questions[idx]);
      setQuestionsToShow(incorrectQuestionsList);
      // Asegurar que el índice sea válido
      setCurrentQuestionIndex(prev => {
        if (prev >= incorrectQuestionsList.length) {
          return 0;
        }
        return prev;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReviewMode, lesson]);

  // Validar y corregir el índice cuando questionsToShow cambia en modo repaso
  useEffect(() => {
    if (isReviewMode && questionsToShow.length > 0) {
      const maxIndex = questionsToShow.length - 1;
      if (currentQuestionIndex > maxIndex) {
        setCurrentQuestionIndex(0);
      }
    }
  }, [isReviewMode, questionsToShow.length, currentQuestionIndex]);

  const handleAnswer = (isCorrect, explanation) => {
    const currentQuestion = isReviewMode ? questionsToShow[currentQuestionIndex] : lesson.questions[currentQuestionIndex];
    const originalIndex = lesson.questions.findIndex(q => q.id === currentQuestion.id);
    
    if (isCorrect) {
      // Otorgar puntos según el modo
      let points = 0;
      if (mode === 'competitive') {
        points = 10; // Más puntos en modo competitivo
      } else if (mode === 'relaxed') {
        points = 5; // Menos puntos en modo relajado
      } else if (mode === 'learning') {
        points = 5; // Menos puntos en modo aprendizaje
      }
      
      // Guardar puntos en todos los modos
      if (points > 0) {
        addPoints(points);
        setPointsEarned(prev => prev + points);
      }
      
      // Si está en modo repaso, remover la pregunta de las incorrectas
      if (isReviewMode) {
        setIncorrectQuestions(prev => {
          const updated = prev.filter(idx => idx !== originalIndex);
          
          // Si no quedan incorrectas, completar lección después del delay
          if (updated.length === 0) {
            setTimeout(() => {
              completeLesson();
            }, 2000);
            return updated;
          }
          
          // Si aún hay incorrectas, actualizar questionsToShow y el índice
          setTimeout(() => {
            const remainingQuestions = updated.map(idx => lesson.questions[idx]);
            setQuestionsToShow(remainingQuestions);
            // Resetear el índice a 0 ya que removimos una pregunta
            setCurrentQuestionIndex(0);
          }, 2000);
          
          return updated;
        });
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
        
        // Guardar el valor actualizado para usarlo en el setTimeout
        const finalIncorrectList = updated;
        
        // En modo repaso, NO avanzar si la respuesta es incorrecta
        // La pregunta se quedará en pantalla hasta que se responda correctamente
        if (isReviewMode) {
          // En modo repaso, si la respuesta es incorrecta, resetear el QuestionCard
          // para permitir intentar de nuevo sin avanzar
          setTimeout(() => {
            setQuestionKey(prevKey => prevKey + 1);
          }, 2000);
        } else {
          // En modo normal, si la respuesta es incorrecta, avanzar a la siguiente pregunta
          // La pregunta incorrecta se repetirá al final de la lección
          setTimeout(() => {
            // Resetear el QuestionCard para permitir avanzar
            setQuestionKey(prevKey => prevKey + 1);
            
            // Usar función de actualización para obtener el índice actual correcto
            setCurrentQuestionIndex(prevIndex => {
              if (prevIndex < lesson.questions.length - 1) {
                return prevIndex + 1;
              } else {
                // Última pregunta completada, verificar si hay incorrectas
                // Usar el valor guardado 'finalIncorrectList' para verificar
                if (finalIncorrectList.length > 0) {
                  // Crear array de preguntas incorrectas para mostrar
                  const incorrectQuestionsList = finalIncorrectList.map(idx => lesson.questions[idx]);
                  setQuestionsToShow(incorrectQuestionsList);
                  setIsReviewMode(true);
                  return 0; // Resetear al inicio del modo repaso
                } else {
                  // No hay incorrectas, completar lección
                  completeLesson();
                  return prevIndex;
                }
              }
            });
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
    const currentLevelId = parseInt(levelId);
    const nextLevelId = currentLevelId + 1;
    const wasUnlocked = checkAndUnlockNextLevel(currentLevelId);
    
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
    const currentLevel = levels.find(l => l.id === parseInt(levelId));
    
    return (
      <>
        <CelebrationModal
          isOpen={showCelebration}
          onClose={handleCloseCelebration}
          pointsEarned={pointsEarned}
          levelId={parseInt(levelId)}
          lessonId={lessonId}
          mode={mode}
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
            {(() => {
              // Verificar si es la última lección del nivel
              const currentLevelId = parseInt(levelId);
              const currentLevel = levels.find(l => l.id === currentLevelId);
              const currentLessonIndex = currentLevel?.lessons.findIndex(l => l.id === lessonId);
              const isLastLesson = currentLevel && currentLessonIndex === currentLevel.lessons.length - 1;
              const nextLevel = levels.find(l => l.id === currentLevelId + 1);
              const hasNextLevel = nextLevel && nextLevel.lessons.length > 0;

              if (isLastLesson) {
                // Es la última lección del nivel
                return (
                  <>
                    <h2>🎉 ¡Nivel Completado!</h2>
                    <p className="level-completed-message">
                      Has completado todas las lecciones del {currentLevel.title}
                    </p>
                    {pointsEarned > 0 && (
                      <p>
                        Has ganado {pointsEarned} puntos
                        {mode === 'competitive' && ' ⚡ (Modo competitivo: puntos extra)'}
                        {mode === 'relaxed' && ' 🌿 (Modo relajado)'}
                        {mode === 'learning' && ' 📘 (Modo aprendizaje)'}
                      </p>
                    )}
                    {pointsEarned === 0 && (
                      <>
                        {mode === 'relaxed' && (
                          <p>¡Nivel completado! Aprendiste sin presión 🎉</p>
                        )}
                        {mode === 'learning' && (
                          <p>¡Nivel completado! Esperamos que hayas aprendido mucho 📘</p>
                        )}
                      </>
                    )}
                    <div className="completion-actions">
                      {hasNextLevel && (
                        <button 
                          className="btn btn-primary" 
                          onClick={() => {
                            const firstLessonOfNextLevel = nextLevel.lessons[0];
                            navigate(`/lesson/${nextLevel.id}/${firstLessonOfNextLevel.id}`);
                          }}
                        >
                          Pasar al siguiente nivel
                        </button>
                      )}
                      <button className="btn btn-secondary" onClick={handleRepeatLesson}>
                        🔄 Repetir lección
                      </button>
                      <button className="btn btn-secondary" onClick={handleBackToLevels}>
                        Volver a niveles
                      </button>
                    </div>
                  </>
                );
              } else {
                // No es la última lección
                return (
                  <>
                    <h2>✅ ¡Lección Completada!</h2>
                    {pointsEarned > 0 && (
                      <p>
                        Has ganado {pointsEarned} puntos
                        {mode === 'competitive' && ' ⚡ (Modo competitivo: puntos extra)'}
                        {mode === 'relaxed' && ' 🌿 (Modo relajado)'}
                        {mode === 'learning' && ' 📘 (Modo aprendizaje)'}
                      </p>
                    )}
                    {pointsEarned === 0 && (
                      <>
                        {mode === 'relaxed' && (
                          <p>¡Lección completada! Aprendiste sin presión 🎉</p>
                        )}
                        {mode === 'learning' && (
                          <p>¡Lección completada! Esperamos que hayas aprendido mucho 📘</p>
                        )}
                      </>
                    )}
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
                  </>
                );
              }
            })()}
          </div>
        </div>
      </>
    );
  }

  // Validar que lesson y questions existan
  if (!lesson || !lesson.questions || lesson.questions.length === 0) {
    return <div className="loading">Cargando lección...</div>;
  }

  // Si estamos en modo repaso y no hay más preguntas incorrectas, completar lección
  if (isReviewMode && incorrectQuestions.length === 0 && !completed) {
    return <div className="loading">Completando lección...</div>;
  }

  // Validar que questionsToShow tenga contenido en modo repaso
  if (isReviewMode && questionsToShow.length === 0 && incorrectQuestions.length > 0) {
    return <div className="loading">Cargando pregunta...</div>;
  }

  // Validar que el índice sea válido
  const maxIndex = isReviewMode ? questionsToShow.length - 1 : lesson.questions.length - 1;
  const validIndex = currentQuestionIndex > maxIndex ? 0 : currentQuestionIndex;

  const currentQuestion = isReviewMode 
    ? (questionsToShow.length > 0 ? questionsToShow[validIndex] : null)
    : lesson.questions[validIndex];
  
  const totalQuestions = isReviewMode 
    ? questionsToShow.length 
    : lesson.questions.length;
  
  const progress = totalQuestions > 0 ? ((validIndex + 1) / totalQuestions) * 100 : 0;

  // Si no hay pregunta actual y no estamos completando, mostrar loading
  if (!currentQuestion && !completed) {
    // Si estamos en modo repaso y questionsToShow está vacío, significa que terminamos
    if (isReviewMode && questionsToShow.length === 0) {
      return <div className="loading">Completando lección...</div>;
    }
    return <div className="loading">Cargando pregunta...</div>;
  }

  return (
    <div className="lesson-view">
      {/* Barra de modo aprendizaje */}
      {mode === 'learning' && (
        <div className="learning-mode-banner">
          <span className="learning-mode-icon">📘</span>
          <span className="learning-mode-text">
            Modo aprendizaje: puedes ver las respuestas correctas antes de responder.
          </span>
        </div>
      )}
      
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
        <p>Pregunta {validIndex + 1} de {totalQuestions}</p>
      </div>
      
      <QuestionCard 
        key={`${currentQuestion.id}-${questionKey}-${isReviewMode ? 'review' : 'normal'}`}
        question={currentQuestion} 
        onAnswer={handleAnswer}
        mode={mode}
      />
    </div>
  );
}

