import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { levels } from '../data/levels.js';
import QuizFromLesson from './QuizFromLesson.jsx';
import { saveLastLesson } from '../utils/storage.js';

/**
 * Componente que muestra una lección completa
 * Tiene dos etapas: "reading" (contenido educativo) y "quiz" (preguntas)
 */
export default function LessonView() {
  const { levelId, lessonId } = useParams();
  const navigate = useNavigate();
  
  const [step, setStep] = useState("reading"); // "reading" | "quiz"
  const [lesson, setLesson] = useState(null);
  const [level, setLevel] = useState(null);

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
        
        // Si la lección no tiene content, saltar directo al quiz
        if (!foundLesson.content) {
          setStep("quiz");
        }
      } else {
        // Lección no encontrada, redirigir a niveles
        navigate('/levels');
      }
    } else {
      navigate('/levels');
    }
  }, [levelId, lessonId, navigate]);

  if (!lesson) {
    return <div className="loading">Cargando lección...</div>;
  }

  // Etapa de lectura
  if (step === "reading") {
    return (
      <div className="lesson-reading">
        <div className="lesson-reading-card">
          <h2>{lesson.title}</h2>
          {lesson.content && (
            <div className="lesson-content">
              {lesson.content.split("\n").map((p, idx) => {
                const trimmed = p.trim();
                // Si la línea está vacía, renderizar un espacio
                if (trimmed === "") {
                  return <br key={idx} />;
                }
                // Si la línea empieza con "-", renderizar como item de lista
                if (trimmed.startsWith("-")) {
                  return (
                    <div key={idx} className="lesson-content-item">
                      {trimmed}
                    </div>
                  );
                }
                // Párrafo normal
                return <p key={idx}>{trimmed}</p>;
              })}
            </div>
          )}
          <button 
            onClick={() => setStep("quiz")} 
            className="primary-btn"
          >
            Comenzar preguntas
          </button>
        </div>
      </div>
    );
  }

  // Etapa de quiz
  return <QuizFromLesson lesson={lesson} level={level} />;
}

