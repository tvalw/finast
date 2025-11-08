/**
 * Utilidades de depuración y testing para Finast
 * 
 * Este archivo contiene funciones útiles para:
 * - Resetear el progreso del usuario
 * - Completar niveles automáticamente (para testing)
 * - Llenar datos de demostración
 * 
 * Estas funciones son útiles para docentes, testers o desarrolladores
 * que quieren probar rápidamente diferentes estados de la aplicación.
 */

import { saveProgress, addPoints, markLessonCompleted, unlockLevel } from './storage.js';
import { levels } from '../data/levels.js';

const STORAGE_KEY = "finast-progress";

/**
 * Resetea completamente el progreso del usuario
 * Borra todos los datos guardados en localStorage relacionados con Finast
 * 
 * @returns {boolean} true si se reseteó correctamente
 */
export function resetProgress() {
  try {
    // Borrar progreso
    localStorage.removeItem(STORAGE_KEY);
    
    // Borrar badges anteriores (para comparación)
    localStorage.removeItem('finast-previous-badges');
    
    // Disparar evento para actualizar la UI
    window.dispatchEvent(new CustomEvent('finast:pointsUpdated'));
    
    return true;
  } catch (error) {
    console.error("Error al resetear el progreso:", error);
    return false;
  }
}

/**
 * Completa automáticamente todas las lecciones de un nivel específico
 * Útil para testing o demostraciones
 * 
 * @param {number} levelId - ID del nivel a completar
 * @returns {boolean} true si se completó correctamente
 */
export function completeLevel(levelId) {
  try {
    const level = levels.find(l => l.id === levelId);
    if (!level) {
      console.error(`Nivel ${levelId} no encontrado`);
      return false;
    }

    // Completar todas las lecciones del nivel
    level.lessons.forEach(lesson => {
      markLessonCompleted(levelId, lesson.id);
      
      // Sumar puntos por cada pregunta
      lesson.questions.forEach(() => {
        addPoints(10);
      });
    });

    // Desbloquear el nivel
    unlockLevel(levelId);
    
    // Desbloquear el siguiente nivel si existe
    const nextLevel = levels.find(l => l.id === levelId + 1);
    if (nextLevel) {
      unlockLevel(levelId + 1);
    }

    return true;
  } catch (error) {
    console.error("Error al completar el nivel:", error);
    return false;
  }
}

/**
 * Completa automáticamente todos los niveles
 * Útil para testing o demostraciones
 * 
 * @returns {boolean} true si se completó correctamente
 */
export function completeAllLevels() {
  try {
    levels.forEach(level => {
      completeLevel(level.id);
    });
    return true;
  } catch (error) {
    console.error("Error al completar todos los niveles:", error);
    return false;
  }
}

/**
 * Llena datos de demostración
 * Completa algunos niveles y agrega puntos para mostrar
 * un estado avanzado de la aplicación
 * 
 * @returns {boolean} true si se llenaron los datos correctamente
 */
export function fillDemoData() {
  try {
    resetProgress();
    
    // Completar los primeros 2 niveles
    completeLevel(1);
    completeLevel(2);
    
    // Agregar algunos puntos extra
    addPoints(50);
    
    // Establecer una racha de 5 días
    const progress = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    progress.streak = 5;
    progress.lastVisit = new Date().toDateString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    
    // Disparar evento para actualizar la UI
    window.dispatchEvent(new CustomEvent('finast:pointsUpdated'));
    
    return true;
  } catch (error) {
    console.error("Error al llenar datos de demostración:", error);
    return false;
  }
}

/**
 * Obtiene información de debug del progreso actual
 * Útil para ver qué hay guardado en localStorage
 * 
 * @returns {Object} Información del progreso
 */
export function getDebugInfo() {
  try {
    const progress = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return {
      progress,
      totalLevels: levels.length,
      totalLessons: levels.reduce((sum, level) => sum + level.lessons.length, 0),
      completedLessons: Object.values(progress.completedLessons || {}).reduce(
        (sum, lessons) => sum + lessons.length, 0
      ),
    };
  } catch (error) {
    console.error("Error al obtener información de debug:", error);
    return null;
  }
}

/**
 * Activa el modo desarrollador
 * Agrega funciones de debug al objeto window para uso en consola
 */
export function enableDeveloperMode() {
  if (typeof window !== 'undefined') {
    window.finastDebug = {
      resetProgress,
      completeLevel,
      completeAllLevels,
      fillDemoData,
      getDebugInfo,
    };
    console.log('🔧 Modo desarrollador activado. Usa window.finastDebug para acceder a las funciones de debug.');
  }
}

// Activar modo desarrollador automáticamente en desarrollo
if (import.meta.env.DEV) {
  enableDeveloperMode();
}

