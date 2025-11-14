import { useState, useEffect } from 'react';

/**
 * Componente que muestra una pregunta y permite responderla
 * Soporta preguntas de opción múltiple y verdadero/falso
 * 
 * Props:
 * - question: objeto con la pregunta (del archivo levels.js)
 * - onAnswer: callback que se ejecuta cuando el usuario responde
 *   Recibe (isCorrect, explanation) como parámetros
 * - mode: modo de aprendizaje ('relaxed', 'competitive', 'learning')
 */
export default function QuestionCard({ question, onAnswer, mode = 'competitive' }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false); // Para modo aprendizaje
  const [timeLeft, setTimeLeft] = useState(10); // Temporizador para modo competitivo

  // Resetear el estado cuando cambia la pregunta
  useEffect(() => {
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
    setShowAnswer(false);
    setTimeLeft(10); // Resetear temporizador
  }, [question.id]);

  // Temporizador para modo competitivo
  useEffect(() => {
    if (mode !== 'competitive' || showResult) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Tiempo agotado: marcar como incorrecto y avanzar
          setIsCorrect(false);
          setShowResult(true);
          
          // Reproducir sonido de error
          try {
            const audio = new Audio('/assets/sounds/error.mp3');
            audio.volume = 0.3;
            audio.play().catch(() => {});
          } catch (error) {
            // Ignorar errores de audio
          }
          
          // Avanzar después de mostrar el resultado
          setTimeout(() => {
            onAnswer(false, question.explanation || 'Tiempo agotado');
          }, 1500);
          
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [mode, showResult, question.id, onAnswer, question.explanation]);

  const handleSelect = (index) => {
    if (showResult) return; // No permitir cambiar respuesta después de responder
    
    setSelectedAnswer(index);
  };

  const handleTrueFalse = (answer) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    let correct = false;
    
    if (question.type === 'multiple') {
      correct = selectedAnswer === question.correctOptionIndex;
    } else if (question.type === 'truefalse') {
      correct = selectedAnswer === question.answer;
    }
    
    setIsCorrect(correct);
    setShowResult(true);
    
    // En modo aprendizaje, siempre tratar como correcto para no penalizar
    const finalCorrect = mode === 'learning' ? true : correct;
    
    // Reproducir sonido de retroalimentación (solo en modos que no sean aprendizaje)
    if (mode !== 'learning') {
      try {
        const audio = new Audio(correct ? '/assets/sounds/correct.mp3' : '/assets/sounds/error.mp3');
        audio.volume = 0.3; // Volumen bajo para no ser molesto
        audio.play().catch(() => {
          // Ignorar errores si el archivo no existe
        });
      } catch (error) {
        // Ignorar errores de audio
      }
    }
    
    // Llamar al callback después de un pequeño delay para que el usuario vea el resultado
    setTimeout(() => {
      onAnswer(finalCorrect, question.explanation);
    }, 100);
  };

  // Obtener la respuesta correcta para mostrar en modo aprendizaje
  const getCorrectAnswer = () => {
    if (question.type === 'multiple') {
      return question.options[question.correctOptionIndex];
    } else if (question.type === 'truefalse') {
      return question.answer ? 'Verdadero' : 'Falso';
    }
    return '';
  };

  return (
    <div className="question-card">
      {/* Temporizador para modo competitivo */}
      {mode === 'competitive' && !showResult && (
        <div className={`question-timer ${timeLeft <= 3 ? 'timer-warning-container' : ''}`}>
          <div className={`timer-circle ${timeLeft <= 3 ? 'timer-warning' : ''}`}>
            <span className="timer-text">{timeLeft}</span>
          </div>
          <span className="timer-label">segundos</span>
        </div>
      )}
      
      <h3 className="question-text">{question.question}</h3>
      
      {/* Botón para ver/ocultar respuesta en modo aprendizaje */}
      {mode === 'learning' && !showResult && (
        <div className="show-answer-section">
          <button
            className="show-answer-btn"
            onClick={() => setShowAnswer(!showAnswer)}
          >
            {showAnswer ? '👁️‍🗨️ Ocultar respuesta' : '💡 Ver respuesta'}
          </button>
        </div>
      )}

      {/* Mostrar respuesta correcta y explicación en modo aprendizaje */}
      {mode === 'learning' && showAnswer && !showResult && (
        <div className="correct-answer-preview">
          <div className="answer-preview-content">
            <span className="answer-preview-label">Respuesta correcta:</span>
            <span className="answer-preview-text">{getCorrectAnswer()}</span>
          </div>
          {question.explanation && (
            <div className="answer-explanation">
              <span className="explanation-icon">💡</span>
              <span className="explanation-text">{question.explanation}</span>
            </div>
          )}
        </div>
      )}
      
      {question.type === 'multiple' && (
        <div className="options-list">
          {question.options.map((option, index) => {
            let className = 'option';
            
            // En modo aprendizaje, resaltar la respuesta correcta si se mostró
            if (mode === 'learning' && showAnswer && index === question.correctOptionIndex) {
              className += ' correct-preview';
            }
            
            // En modo aprendizaje con respuesta visible, deshabilitar botones
            if (mode === 'learning' && showAnswer) {
              className += ' disabled-preview';
            }
            
            if (showResult) {
              if (index === question.correctOptionIndex) {
                className += ' correct';
              } else if (index === selectedAnswer && !isCorrect) {
                className += ' incorrect';
              }
            } else if (index === selectedAnswer) {
              className += ' selected';
            }
            
            return (
              <button
                key={index}
                className={className}
                onClick={() => handleSelect(index)}
                disabled={showResult || (mode === 'learning' && showAnswer)}
              >
                {option}
                {mode === 'learning' && showAnswer && index === question.correctOptionIndex && ' ✅'}
              </button>
            );
          })}
        </div>
      )}
      
      {question.type === 'truefalse' && (
        <>
          {/* Mostrar respuesta correcta en modo aprendizaje */}
          {mode === 'learning' && showAnswer && !showResult && (
            <div className="correct-answer-preview">
              <div className="answer-preview-content">
                <span className="answer-preview-label">Respuesta correcta:</span>
                <span className="answer-preview-text">{getCorrectAnswer()}</span>
              </div>
            </div>
          )}
          <div className="truefalse-options">
            <button
              className={`option ${selectedAnswer === true ? 'selected' : ''} ${showResult && question.answer === true ? 'correct' : ''} ${showResult && selectedAnswer === true && !isCorrect ? 'incorrect' : ''} ${mode === 'learning' && showAnswer && question.answer === true ? 'correct-preview' : ''} ${mode === 'learning' && showAnswer ? 'disabled-preview' : ''}`}
              onClick={() => handleTrueFalse(true)}
              disabled={showResult || (mode === 'learning' && showAnswer)}
            >
              ✅ Verdadero
              {mode === 'learning' && showAnswer && question.answer === true && ' ✅'}
            </button>
            <button
              className={`option ${selectedAnswer === false ? 'selected' : ''} ${showResult && question.answer === false ? 'correct' : ''} ${showResult && selectedAnswer === false && !isCorrect ? 'incorrect' : ''} ${mode === 'learning' && showAnswer && question.answer === false ? 'correct-preview' : ''} ${mode === 'learning' && showAnswer ? 'disabled-preview' : ''}`}
              onClick={() => handleTrueFalse(false)}
              disabled={showResult || (mode === 'learning' && showAnswer)}
            >
              ❌ Falso
              {mode === 'learning' && showAnswer && question.answer === false && ' ✅'}
            </button>
          </div>
        </>
      )}
      
      {/* En modo aprendizaje, permitir responder incluso si se vio la respuesta */}
      {!showResult && selectedAnswer !== null && (
        <button 
          className="btn btn-primary" 
          onClick={handleSubmit}
          disabled={mode === 'learning' && showAnswer}
        >
          {mode === 'learning' && showAnswer ? 'Ya viste la respuesta' : 'Responder'}
        </button>
      )}
      
      {/* En modo aprendizaje, si no hay respuesta seleccionada pero se vio la respuesta, mostrar botón para continuar */}
      {mode === 'learning' && showAnswer && selectedAnswer === null && (
        <button 
          className="btn btn-primary" 
          onClick={() => {
            // Simular respuesta correcta para avanzar
            setIsCorrect(true);
            setShowResult(true);
            setTimeout(() => {
              onAnswer(true, question.explanation);
            }, 100);
          }}
        >
          Continuar
        </button>
      )}
      
      {showResult && (
        <div className={`result ${isCorrect ? 'correct' : 'incorrect'}`}>
          <p className="result-message">
            {isCorrect ? '✅ ¡Correcto!' : '❌ Incorrecto'}
          </p>
          <p className="explanation">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}

