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
 * Puede recibir valores negativos para restar puntos
 */
export function addPoints(points) {
  const progress = getProgress();
  const currentPoints = progress.points || 0;
  progress.points = Math.max(0, currentPoints + points); // No permitir puntos negativos
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
    
    // Disparar evento para actualizar la UI
    window.dispatchEvent(new CustomEvent('finast:levelUnlocked', { 
      detail: { levelId } 
    }));
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

// ============================================
// FUNCIONES PARA GUARDAR PREFERENCIAS DE UI
// ============================================

const UI_STORAGE_KEY = "finast-ui-preferences";

/**
 * Obtiene todas las preferencias de UI guardadas
 */
function getUIPreferences() {
  try {
    const stored = localStorage.getItem(UI_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error al leer preferencias de UI:", error);
  }
  
  return {};
}

/**
 * Guarda las preferencias de UI
 */
function saveUIPreferences(preferences) {
  try {
    const current = getUIPreferences();
    const updated = { ...current, ...preferences };
    localStorage.setItem(UI_STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Error al guardar preferencias de UI:", error);
  }
}

/**
 * Guarda el estado de minimización de los widgets flotantes
 */
export function saveWidgetsState(challengeMinimized, quickActionsMinimized) {
  saveUIPreferences({
    widgets: {
      challengeMinimized,
      quickActionsMinimized
    }
  });
}

/**
 * Obtiene el estado de minimización de los widgets flotantes
 */
export function getWidgetsState() {
  const preferences = getUIPreferences();
  return {
    challengeMinimized: preferences.widgets?.challengeMinimized || false,
    quickActionsMinimized: preferences.widgets?.quickActionsMinimized || false
  };
}

/**
 * Guarda la categoría seleccionada en la página de recursos
 */
export function saveResourcesCategory(category) {
  saveUIPreferences({
    resourcesCategory: category
  });
}

/**
 * Obtiene la categoría seleccionada en la página de recursos
 */
export function getResourcesCategory() {
  const preferences = getUIPreferences();
  return preferences.resourcesCategory || 'all';
}

/**
 * Guarda la categoría seleccionada en la página de inicio
 */
export function saveHomeResourcesCategory(category) {
  saveUIPreferences({
    homeResourcesCategory: category
  });
}

/**
 * Obtiene la categoría seleccionada en la página de inicio
 */
export function getHomeResourcesCategory() {
  const preferences = getUIPreferences();
  return preferences.homeResourcesCategory || 'all';
}

/**
 * Obtiene todos los feedbacks guardados de los niveles
 * @returns {Array} Array de objetos con feedback de niveles
 */
export function getLevelFeedbacks() {
  try {
    const feedbacks = localStorage.getItem('finast-level-feedbacks');
    return feedbacks ? JSON.parse(feedbacks) : [];
  } catch (error) {
    console.error("Error al leer los feedbacks:", error);
    return [];
  }
}

/**
 * Guarda el desafío semanal aceptado por el usuario
 * @param {Object} challenge - Objeto del desafío aceptado
 */
export function saveAcceptedChallenge(challenge) {
  try {
    const challengeData = {
      ...challenge,
      acceptedDate: new Date().toISOString(),
      weekNumber: getCurrentWeekNumber()
    };
    localStorage.setItem('finast-accepted-challenge', JSON.stringify(challengeData));
    
    // Disparar evento para actualizar la UI
    window.dispatchEvent(new CustomEvent('finast:challengeAccepted', { 
      detail: { challenge: challengeData } 
    }));
  } catch (error) {
    console.error("Error al guardar el desafío aceptado:", error);
  }
}

/**
 * Obtiene el desafío semanal aceptado por el usuario
 * @returns {Object|null} El desafío aceptado o null si no hay ninguno
 */
export function getAcceptedChallenge() {
  try {
    const stored = localStorage.getItem('finast-accepted-challenge');
    if (stored) {
      const challenge = JSON.parse(stored);
      // Verificar si el desafío es de la semana actual
      const currentWeek = getCurrentWeekNumber();
      if (challenge.weekNumber === currentWeek) {
        return challenge;
      } else {
        // Si es de otra semana, limpiar el desafío
        clearAcceptedChallenge();
        return null;
      }
    }
    return null;
  } catch (error) {
    console.error("Error al leer el desafío aceptado:", error);
    return null;
  }
}

/**
 * Elimina el desafío aceptado
 */
export function clearAcceptedChallenge() {
  try {
    localStorage.removeItem('finast-accepted-challenge');
    window.dispatchEvent(new CustomEvent('finast:challengeCleared'));
  } catch (error) {
    console.error("Error al eliminar el desafío aceptado:", error);
  }
}

/**
 * Obtiene el número de semana actual del año
 * @returns {number} Número de semana (1-52)
 */
function getCurrentWeekNumber() {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const days = Math.floor((now - startOfYear) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + startOfYear.getDay() + 1) / 7);
}

/**
 * Marca un desafío como completado y otorga puntos
 * @param {string} challengeId - ID del desafío completado
 * @param {number} rewardPoints - Puntos a otorgar
 * @returns {boolean} true si se completó exitosamente, false si ya estaba completado
 */
export function completeChallenge(challengeId, rewardPoints) {
  try {
    const completedKey = 'finast-completed-challenges';
    const completed = JSON.parse(localStorage.getItem(completedKey) || '[]');
    
    // Verificar si ya está completado
    const currentWeek = getCurrentWeekNumber();
    const alreadyCompleted = completed.some(
      c => c.challengeId === challengeId && c.weekNumber === currentWeek
    );
    
    if (alreadyCompleted) {
      return false; // Ya estaba completado
    }
    
    // Agregar a la lista de completados
    completed.push({
      challengeId,
      weekNumber: currentWeek,
      completedDate: new Date().toISOString(),
      rewardPoints
    });
    
    localStorage.setItem(completedKey, JSON.stringify(completed));
    
    // Otorgar puntos
    addPoints(rewardPoints);
    
    // Disparar evento
    window.dispatchEvent(new CustomEvent('finast:challengeCompleted', { 
      detail: { challengeId, rewardPoints } 
    }));
    
    return true;
  } catch (error) {
    console.error("Error al completar el desafío:", error);
    return false;
  }
}

/**
 * Verifica si un desafío está completado
 * @param {string} challengeId - ID del desafío
 * @returns {boolean} true si está completado
 */
export function isChallengeCompleted(challengeId) {
  try {
    const completedKey = 'finast-completed-challenges';
    const completed = JSON.parse(localStorage.getItem(completedKey) || '[]');
    const currentWeek = getCurrentWeekNumber();
    
    return completed.some(
      c => c.challengeId === challengeId && c.weekNumber === currentWeek
    );
  } catch (error) {
    console.error("Error al verificar el desafío:", error);
    return false;
  }
}

// ============================================
// FUNCIONES PARA EL GLOSARIO FINANCIERO
// ============================================

const GLOSSARY_VIEWS_KEY = 'finast-glossary-views';

/**
 * Registra una visualización de un término del glosario
 * @param {string} term - Nombre del término
 */
export function addViewedTerm(term) {
  try {
    const views = JSON.parse(localStorage.getItem(GLOSSARY_VIEWS_KEY) || '{}');
    if (views[term]) {
      views[term] = {
        term,
        views: views[term].views + 1,
        lastViewed: new Date().toISOString()
      };
    } else {
      views[term] = {
        term,
        views: 1,
        lastViewed: new Date().toISOString()
      };
    }
    localStorage.setItem(GLOSSARY_VIEWS_KEY, JSON.stringify(views));
  } catch (error) {
    console.error("Error al registrar visualización del término:", error);
  }
}

/**
 * Obtiene los términos más vistos, ordenados por número de visualizaciones
 * @param {number} limit - Número máximo de términos a retornar (default: 10)
 * @returns {Array} Array de objetos con term y views
 */
export function getMostViewedTerms(limit = 10) {
  try {
    const views = JSON.parse(localStorage.getItem(GLOSSARY_VIEWS_KEY) || '{}');
    const termsArray = Object.values(views);
    
    // Ordenar por número de visualizaciones (descendente)
    termsArray.sort((a, b) => b.views - a.views);
    
    return termsArray.slice(0, limit);
  } catch (error) {
    console.error("Error al obtener términos más vistos:", error);
    return [];
  }
}

