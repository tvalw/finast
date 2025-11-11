import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LessonView from '../components/LessonView.jsx';
import { getMode } from '../utils/storage.js';

/**
 * Página que muestra una lección específica
 * Verifica que el usuario tenga un modo seleccionado antes de mostrar la lección
 */
export default function Lesson() {
  const navigate = useNavigate();

  useEffect(() => {
    const mode = getMode();
    if (!mode) {
      // Si no hay modo seleccionado, redirigir a la página de selección
      navigate('/mode');
    }
  }, [navigate]);

  const mode = getMode();
  
  // Si no hay modo, no renderizar nada (la redirección se encargará)
  if (!mode) {
    return null;
  }

  return <LessonView mode={mode} />;
}

