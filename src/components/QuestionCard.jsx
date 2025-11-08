import { useState, useEffect } from 'react';

/**
 * Componente que muestra una pregunta y permite responderla
 * Soporta preguntas de opción múltiple y verdadero/falso
 * 
 * Props:
 * - question: objeto con la pregunta (del archivo levels.js)
 * - onAnswer: callback que se ejecuta cuando el usuario responde
 *   Recibe (isCorrect, explanation) como parámetros
 */
export default function QuestionCard({ question, onAnswer }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Resetear el estado cuando cambia la pregunta
  useEffect(() => {
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
  }, [question.id]);

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
    
    // Reproducir sonido de retroalimentación
    try {
      const audio = new Audio(correct ? '/assets/sounds/correct.mp3' : '/assets/sounds/error.mp3');
      audio.volume = 0.3; // Volumen bajo para no ser molesto
      audio.play().catch(() => {
        // Ignorar errores si el archivo no existe
      });
    } catch (error) {
      // Ignorar errores de audio
    }
    
    // Llamar al callback después de un pequeño delay para que el usuario vea el resultado
    setTimeout(() => {
      onAnswer(correct, question.explanation);
    }, 100);
  };

  return (
    <div className="question-card">
      <h3 className="question-text">{question.question}</h3>
      
      {question.type === 'multiple' && (
        <div className="options-list">
          {question.options.map((option, index) => {
            let className = 'option';
            
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
                disabled={showResult}
              >
                {option}
              </button>
            );
          })}
        </div>
      )}
      
      {question.type === 'truefalse' && (
        <div className="truefalse-options">
          <button
            className={`option ${selectedAnswer === true ? 'selected' : ''} ${showResult && question.answer === true ? 'correct' : ''} ${showResult && selectedAnswer === true && !isCorrect ? 'incorrect' : ''}`}
            onClick={() => handleTrueFalse(true)}
            disabled={showResult}
          >
            ✅ Verdadero
          </button>
          <button
            className={`option ${selectedAnswer === false ? 'selected' : ''} ${showResult && question.answer === false ? 'correct' : ''} ${showResult && selectedAnswer === false && !isCorrect ? 'incorrect' : ''}`}
            onClick={() => handleTrueFalse(false)}
            disabled={showResult}
          >
            ❌ Falso
          </button>
        </div>
      )}
      
      {!showResult && selectedAnswer !== null && (
        <button className="btn btn-primary" onClick={handleSubmit}>
          Responder
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

