/**
 * Utilidades para cálculos y recomendaciones en la página de inicio
 * 
 * Contiene lógica para:
 * - Calcular recomendaciones basadas en el progreso
 * - Determinar el siguiente paso sugerido
 * - Calcular estadísticas diarias
 */

import { getProgress } from './storage.js';
import { levels } from '../data/levels.js';
import { isLevelUnlocked, isLevelCompleted } from './progress.js';

/**
 * Obtiene la lección actual donde el usuario debe continuar
 * @returns {Object|null} Objeto con { levelId, lessonId, levelTitle, lessonTitle } o null
 */
export function getCurrentLesson() {
  const progress = getProgress();
  const lastLesson = progress.lastLesson;
  
  if (!lastLesson) {
    // Si no hay última lección, devolver la primera del primer nivel
    const firstLevel = levels.find(l => l.id === 1);
    if (firstLevel && firstLevel.lessons.length > 0) {
      return {
        levelId: 1,
        lessonId: firstLevel.lessons[0].id,
        levelTitle: firstLevel.title,
        lessonTitle: firstLevel.lessons[0].title
      };
    }
    return null;
  }

  const level = levels.find(l => l.id === lastLesson.levelId);
  if (!level) return null;

  const lesson = level.lessons.find(l => l.id === lastLesson.lessonId);
  if (!lesson) return null;

  return {
    levelId: lastLesson.levelId,
    lessonId: lastLesson.lessonId,
    levelTitle: level.title,
    lessonTitle: lesson.title
  };
}

/**
 * Calcula el porcentaje de progreso de la lección actual
 * @returns {number} Porcentaje de 0 a 100
 */
export function getCurrentLessonProgress() {
  const progress = getProgress();
  const lastLesson = progress.lastLesson;
  
  if (!lastLesson) return 0;

  const level = levels.find(l => l.id === lastLesson.levelId);
  if (!level) return 0;

  const lesson = level.lessons.find(l => l.id === lastLesson.lessonId);
  if (!lesson) return 0;

  // Verificar si la lección está completada
  const isCompleted = progress.completedLessons[lastLesson.levelId]?.includes(lastLesson.lessonId);
  if (isCompleted) {
    // Si está completada, buscar la siguiente lección
    const lessonIndex = level.lessons.findIndex(l => l.id === lastLesson.lessonId);
    if (lessonIndex < level.lessons.length - 1) {
      return 0; // Nueva lección, 0% de progreso
    }
    return 100; // Última lección completada
  }

  // Por simplicidad, asumimos 50% si no está completada
  return 50;
}

/**
 * Obtiene recomendaciones basadas en el progreso del usuario
 * @returns {Array} Array de objetos con recomendaciones
 */
export function getRecommendations() {
  const progress = getProgress();
  const recommendations = [];

  // Recomendación 1: Si no ha completado ninguna lección
  const hasCompletedAny = Object.values(progress.completedLessons).some(
    lessons => lessons.length > 0
  );

  if (!hasCompletedAny) {
    recommendations.push({
      id: 'start-learning',
      type: 'beginner',
      title: 'Comienza tu Primer Nivel',
      description: 'Aprende los fundamentos del ahorro y da tus primeros pasos',
      action: 'Comenzar',
      level: 1,
      lesson: '1-1'
    });
  }

  // Recomendación 2: Basada en el nivel actual
  const currentLevel = Math.max(...progress.unlockedLevels, 1);
  const level = levels.find(l => l.id === currentLevel);
  
  if (level) {
    const completedCount = (progress.completedLessons[currentLevel] || []).length;
    const totalLessons = level.lessons.length;
    
    if (completedCount < totalLessons) {
      // Hay lecciones pendientes en el nivel actual
      const nextLesson = level.lessons[completedCount];
      recommendations.push({
        id: 'continue-level',
        type: 'progress',
        title: `Continúa: ${level.title}`,
        description: `Siguiente lección: ${nextLesson.title}`,
        action: 'Continuar',
        level: currentLevel,
        lesson: nextLesson.id
      });
    } else if (currentLevel < levels.length) {
      // Nivel completado, sugerir el siguiente
      const nextLevel = levels.find(l => l.id === currentLevel + 1);
      if (nextLevel && isLevelUnlocked(currentLevel + 1)) {
        recommendations.push({
          id: 'next-level',
          type: 'progress',
          title: `Nuevo Nivel: ${nextLevel.title}`,
          description: 'Desbloqueaste un nuevo nivel. ¡Explóralo!',
          action: 'Explorar',
          level: currentLevel + 1,
          lesson: nextLevel.lessons[0].id
        });
      }
    }
  }

  // Recomendación 3: Si tiene racha, sugerir mantenerla
  if (progress.streak >= 3) {
    recommendations.push({
      id: 'maintain-streak',
      type: 'motivation',
      title: '¡Mantén tu Racha!',
      description: `Llevas ${progress.streak} días consecutivos. ¡Sigue así!`,
      action: 'Practicar',
      level: null,
      lesson: null
    });
  }

  return recommendations.slice(0, 2); // Máximo 2 recomendaciones
}

/**
 * Calcula estadísticas diarias del usuario
 * @returns {Object} Objeto con estadísticas
 */
export function getDailyStats() {
  const progress = getProgress();
  
  let completedLessonsCount = 0;
  Object.values(progress.completedLessons || {}).forEach(lessons => {
    completedLessonsCount += lessons.length;
  });

  return {
    streak: progress.streak || 0,
    points: progress.points || 0,
    completedLessons: completedLessonsCount,
    unlockedLevels: progress.unlockedLevels.length || 1
  };
}

/**
 * Obtiene el nombre del usuario
 * @returns {string} Nombre del usuario
 */
export function getUserName() {
  try {
    const userData = localStorage.getItem('finast-user');
    if (userData) {
      const user = JSON.parse(userData);
      return user.name || 'Usuario';
    }
  } catch (error) {
    console.error('Error al obtener nombre de usuario:', error);
  }
  return 'Usuario';
}

