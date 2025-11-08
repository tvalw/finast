/**
 * Utilidades para calcular y verificar el progreso del usuario
 * 
 * Funciones auxiliares para determinar qué niveles están desbloqueados,
 * qué insignias se han ganado, etc.
 */

import { getProgress, unlockLevel } from './storage.js';
import { levels } from '../data/levels.js';

/**
 * Verifica si un nivel está desbloqueado
 */
export function isLevelUnlocked(levelId) {
  const progress = getProgress();
  return progress.unlockedLevels.includes(levelId);
}

/**
 * Verifica si todas las lecciones de un nivel están completadas
 */
export function isLevelCompleted(levelId) {
  const progress = getProgress();
  const level = levels.find(l => l.id === levelId);
  
  if (!level) return false;
  
  const completedLessons = progress.completedLessons[levelId] || [];
  return completedLessons.length === level.lessons.length;
}

/**
 * Desbloquea el siguiente nivel si se completó el actual
 * Esta función debe llamarse DESPUÉS de marcar una lección como completada
 */
export function checkAndUnlockNextLevel(completedLevelId) {
  // Leer el progreso actualizado después de marcar la lección como completada
  const progress = getProgress();
  const level = levels.find(l => l.id === completedLevelId);
  
  if (!level) {
    console.warn(`⚠️ Nivel ${completedLevelId} no encontrado`);
    return false;
  }
  
  // Verificar si todas las lecciones del nivel están completadas
  const completedLessons = progress.completedLessons[completedLevelId] || [];
  const allLessonsCompleted = completedLessons.length === level.lessons.length;
  
  console.log(`🔍 Verificando nivel ${completedLevelId}:`, {
    leccionesCompletadas: completedLessons.length,
    totalLecciones: level.lessons.length,
    todasCompletadas: allLessonsCompleted,
    lecciones: completedLessons
  });
  
  // Si el nivel está completo, desbloquear el siguiente
  if (allLessonsCompleted) {
    const nextLevelId = completedLevelId + 1;
    const nextLevel = levels.find(l => l.id === nextLevelId);
    
    if (nextLevel) {
      unlockLevel(nextLevelId);
      console.log(`✅ Nivel ${completedLevelId} completado. Nivel ${nextLevelId} desbloqueado.`);
      return true;
    } else {
      console.log(`ℹ️ Nivel ${completedLevelId} completado, pero no hay siguiente nivel.`);
    }
  } else {
    console.log(`⏳ Nivel ${completedLevelId} aún no completado: ${completedLessons.length}/${level.lessons.length} lecciones`);
  }
  
  return false;
}

/**
 * Obtiene todas las insignias desbloqueadas
 * Retorna un array de objetos con { id, name, description }
 */
export function getUnlockedBadges() {
  const progress = getProgress();
  const badges = [];
  
  // Badge: Primer paso - Completar cualquier lección
  const hasCompletedAnyLesson = Object.values(progress.completedLessons).some(
    lessons => lessons.length > 0
  );
  if (hasCompletedAnyLesson) {
    badges.push({
      id: "first-step",
      name: "Primer paso",
      description: "Completaste tu primera lección"
    });
  }
  
  // Badge: Ahorrista - Completar todas las lecciones del Nivel 1
  if (isLevelCompleted(1)) {
    badges.push({
      id: "saver",
      name: "Ahorrista",
      description: "Completaste todas las lecciones de Ahorro básico"
    });
  }
  
  // Badge: Constante - Racha >= 3
  if (progress.streak >= 3) {
    badges.push({
      id: "consistent",
      name: "Constante",
      description: "Mantienes una racha de 3 días o más"
    });
  }
  
  // Badge: Estudiante dedicado - Racha >= 7
  if (progress.streak >= 7) {
    badges.push({
      id: "dedicated",
      name: "Estudiante dedicado",
      description: "Mantienes una racha de 7 días o más"
    });
  }
  
  // Badge: Presupuestador - Completar Nivel 2
  if (isLevelCompleted(2)) {
    badges.push({
      id: "budgeter",
      name: "Presupuestador",
      description: "Completaste todas las lecciones de Presupuesto personal"
    });
  }
  
  // Badge: Experto en crédito - Completar Nivel 3
  if (isLevelCompleted(3)) {
    badges.push({
      id: "credit-expert",
      name: "Experto en crédito",
      description: "Completaste todas las lecciones de Deudas y crédito"
    });
  }
  
  // Badge: Maestro financiero - Completar todos los niveles
  const allLevelsCompleted = levels.every(level => isLevelCompleted(level.id));
  if (allLevelsCompleted) {
    badges.push({
      id: "master",
      name: "Maestro financiero",
      description: "Completaste todos los niveles de Finast"
    });
  }
  
  return badges;
}

