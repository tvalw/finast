/**
 * Utilidades para manejar el almacenamiento local (localStorage)
 * 
 * Este archivo contiene todas las funciones para guardar y leer
 * el progreso del usuario en la aplicación.
 */

const STORAGE_KEY = "finast-progress";

/**
 * Obtiene el progreso guardado del usuario
 * Si no existe, devuelve un objeto con valores por defecto
 */
export function getProgress() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error al leer el progreso:", error);
  }
  
  // Valores por defecto si no hay nada guardado
  return {
    points: 0,
    streak: 0,
    lastVisit: null,
    completedLessons: {},
    unlockedLevels: [1], // El primer nivel siempre está desbloqueado
    lastLesson: null // { levelId, lessonId } de la última lección vista
  };
}

/**
 * Guarda el progreso en localStorage
 */
export function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error("Error al guardar el progreso:", error);
  }
}

/**
 * Suma puntos al usuario y guarda el progreso
 */
export function addPoints(points) {
  const progress = getProgress();
  progress.points = (progress.points || 0) + points;
  saveProgress(progress);
  
  // Disparar evento para actualizar la UI
  window.dispatchEvent(new CustomEvent('finast:pointsUpdated'));
  
  return progress.points;
}

/**
 * Marca una lección como completada
 * levelId: número del nivel (ej: 1)
 * lessonId: string del ID de la lección (ej: "1-1")
 */
export function markLessonCompleted(levelId, lessonId) {
  const progress = getProgress();
  
  // Inicializar el array de lecciones completadas del nivel si no existe
  if (!progress.completedLessons[levelId]) {
    progress.completedLessons[levelId] = [];
  }
  
  // Agregar la lección si no está ya completada
  if (!progress.completedLessons[levelId].includes(lessonId)) {
    progress.completedLessons[levelId].push(lessonId);
  }
  
  saveProgress(progress);
}

/**
 * Desbloquea un nivel
 */
export function unlockLevel(levelId) {
  const progress = getProgress();
  
  if (!progress.unlockedLevels.includes(levelId)) {
    progress.unlockedLevels.push(levelId);
    saveProgress(progress);
  }
}

/**
 * Actualiza la racha del usuario
 * Compara la fecha actual con la última visita
 * - Si es el mismo día: mantiene la racha
 * - Si es el día siguiente: suma 1
 * - Si pasaron más días: resetea a 0
 */
export function updateStreak() {
  const progress = getProgress();
  const today = new Date().toDateString(); // Formato: "Mon Jan 01 2024"
  
  if (!progress.lastVisit) {
    // Primera visita
    progress.streak = 1;
    progress.lastVisit = today;
  } else if (progress.lastVisit === today) {
    // Ya visitó hoy, mantener racha
    // No cambiamos nada
  } else {
    // Calcular diferencia de días
    const lastDate = new Date(progress.lastVisit);
    const todayDate = new Date(today);
    const diffTime = todayDate - lastDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      // Día siguiente: suma 1 a la racha
      progress.streak = (progress.streak || 0) + 1;
    } else {
      // Pasaron más días: resetea la racha
      progress.streak = 1;
    }
    
    progress.lastVisit = today;
  }
  
  saveProgress(progress);
  return progress.streak;
}

/**
 * Guarda la última lección vista
 */
export function saveLastLesson(levelId, lessonId) {
  const progress = getProgress();
  progress.lastLesson = { levelId, lessonId };
  saveProgress(progress);
}

/**
 * Obtiene la última lección vista
 */
export function getLastLesson() {
  const progress = getProgress();
  return progress.lastLesson;
}

/**
 * Verifica si una lección está completada
 */
export function isLessonCompleted(levelId, lessonId) {
  const progress = getProgress();
  return progress.completedLessons[levelId]?.includes(lessonId) || false;
}

/**
 * Obtiene el número de lecciones completadas en un nivel
 */
export function getCompletedLessonsCount(levelId) {
  const progress = getProgress();
  return progress.completedLessons[levelId]?.length || 0;
}

