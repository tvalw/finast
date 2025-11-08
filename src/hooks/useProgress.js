import { useState, useEffect } from 'react';
import { getProgress, addPoints, markLessonCompleted, unlockLevel } from '../utils/storage.js';
import { getUnlockedBadges, isLevelCompleted, checkAndUnlockNextLevel } from '../utils/progress.js';
import { levels } from '../data/levels.js';

/**
 * Hook personalizado para manejar el progreso del usuario
 * 
 * Este hook centraliza toda la lógica relacionada con:
 * - Puntos del usuario
 * - Racha de días
 * - Niveles desbloqueados
 * - Lecciones completadas
 * - Insignias obtenidas
 * - Nivel del usuario (Novato/Intermedio/Experto)
 * 
 * @returns {Object} Objeto con el progreso y funciones para actualizarlo
 */
export function useProgress() {
  const [progress, setProgress] = useState(() => getProgress());
  const [badges, setBadges] = useState(() => getUnlockedBadges());

  // Actualizar el progreso cuando cambia localStorage
  useEffect(() => {
    const updateProgress = () => {
      setProgress(getProgress());
      setBadges(getUnlockedBadges());
    };

    // Actualizar al montar
    updateProgress();

    // Escuchar eventos de actualización
    const handlePointsUpdate = () => updateProgress();
    const handleStorageChange = () => updateProgress();
    const handleFocus = () => updateProgress();

    window.addEventListener('finast:pointsUpdated', handlePointsUpdate);
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('finast:pointsUpdated', handlePointsUpdate);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  /**
   * Obtiene el nombre del nivel del usuario basado en sus puntos
   * @returns {string} Nombre del nivel (Novato, Intermedio, Experto)
   */
  const getLevelName = () => {
    const points = progress.points || 0;
    if (points < 50) return "Novato 💡";
    if (points < 150) return "Intermedio 💪";
    return "Experto 💰";
  };

  /**
   * Calcula el porcentaje de progreso total
   * Basado en el número de preguntas completadas vs total de preguntas
   * @returns {number} Porcentaje de 0 a 100
   */
  const getTotalProgress = () => {
    let totalQuestions = 0;
    let completedQuestions = 0;

    levels.forEach(level => {
      level.lessons.forEach(lesson => {
        totalQuestions += lesson.questions.length;
        const completedLessons = progress.completedLessons[level.id] || [];
        if (completedLessons.includes(lesson.id)) {
          completedQuestions += lesson.questions.length;
        }
      });
    });

    if (totalQuestions === 0) return 0;
    return Math.round((completedQuestions / totalQuestions) * 100);
  };

  /**
   * Obtiene el número total de lecciones completadas
   * @returns {number} Número de lecciones completadas
   */
  const getCompletedLessonsCount = () => {
    let count = 0;
    Object.values(progress.completedLessons || {}).forEach(lessons => {
      count += lessons.length;
    });
    return count;
  };

  /**
   * Obtiene el número total de preguntas completadas
   * @returns {number} Número de preguntas completadas
   */
  const getCompletedQuestionsCount = () => {
    let count = 0;
    levels.forEach(level => {
      const completedLessons = progress.completedLessons[level.id] || [];
      level.lessons.forEach(lesson => {
        if (completedLessons.includes(lesson.id)) {
          count += lesson.questions.length;
        }
      });
    });
    return count;
  };

  /**
   * Suma puntos al usuario
   * @param {number} points - Puntos a sumar
   * @returns {number} Nuevo total de puntos
   */
  const addPointsToUser = (points) => {
    const newTotal = addPoints(points);
    setProgress(getProgress());
    return newTotal;
  };

  /**
   * Marca una lección como completada
   * @param {number} levelId - ID del nivel
   * @param {string} lessonId - ID de la lección
   */
  const completeLesson = (levelId, lessonId) => {
    markLessonCompleted(levelId, lessonId);
    checkAndUnlockNextLevel(levelId);
    setProgress(getProgress());
    setBadges(getUnlockedBadges());
  };

  return {
    // Estado actual
    points: progress.points || 0,
    streak: progress.streak || 0,
    unlockedLevels: progress.unlockedLevels || [1],
    completedLessons: progress.completedLessons || {},
    badges,
    
    // Funciones calculadas
    levelName: getLevelName(),
    totalProgress: getTotalProgress(),
    completedLessonsCount: getCompletedLessonsCount(),
    completedQuestionsCount: getCompletedQuestionsCount(),
    
    // Funciones para actualizar
    addPoints: addPointsToUser,
    completeLesson,
    
    // Progreso completo (para casos especiales)
    fullProgress: progress,
  };
}

