/**
 * Desafíos diarios para motivar el aprendizaje continuo
 * 
 * Los desafíos cambian cada día y ofrecen recompensas adicionales
 */

/**
 * Obtiene el desafío del día actual
 * @returns {Object} Objeto con el desafío del día
 */
export function getDailyChallenge() {
  // Obtener la fecha actual como string (YYYY-MM-DD)
  const today = new Date().toISOString().split('T')[0];
  
  // Obtener el desafío guardado
  try {
    const saved = localStorage.getItem('finast-daily-challenge');
    if (saved) {
      const challenge = JSON.parse(saved);
      // Si el desafío es de hoy, devolverlo
      if (challenge.date === today) {
        return challenge;
      }
    }
  } catch (error) {
    console.error('Error al leer desafío diario:', error);
  }

  // Generar nuevo desafío para hoy
  const challenges = [
    {
      id: 1,
      title: 'Completa 2 lecciones hoy',
      description: 'Termina 2 lecciones y gana 50 puntos extra',
      target: 2,
      reward: 50,
      type: 'lessons',
      icon: '📚'
    },
    {
      id: 2,
      title: 'Mantén tu racha',
      description: 'Practica hoy para mantener tu racha de días consecutivos',
      target: 1,
      reward: 30,
      type: 'streak',
      icon: '🔥'
    },
    {
      id: 3,
      title: 'Gana 100 puntos',
      description: 'Acumula 100 puntos hoy respondiendo preguntas correctamente',
      target: 100,
      reward: 25,
      type: 'points',
      icon: '⭐'
    },
    {
      id: 4,
      title: 'Completa un nivel completo',
      description: 'Termina todas las lecciones de un nivel y gana 75 puntos',
      target: 1,
      reward: 75,
      type: 'level',
      icon: '🎯'
    }
  ];

  // Seleccionar un desafío aleatorio
  const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
  
  const newChallenge = {
    ...randomChallenge,
    date: today,
    progress: 0,
    completed: false
  };

  // Guardar el desafío
  try {
    localStorage.setItem('finast-daily-challenge', JSON.stringify(newChallenge));
  } catch (error) {
    console.error('Error al guardar desafío diario:', error);
  }

  return newChallenge;
}

/**
 * Actualiza el progreso del desafío diario
 * @param {string} type - Tipo de progreso ('lessons', 'points', 'streak', 'level')
 * @param {number} amount - Cantidad a agregar
 */
export function updateChallengeProgress(type, amount = 1) {
  const challenge = getDailyChallenge();
  
  if (challenge.completed || challenge.type !== type) {
    return;
  }

  challenge.progress = Math.min(challenge.progress + amount, challenge.target);
  
  if (challenge.progress >= challenge.target && !challenge.completed) {
    challenge.completed = true;
    // Aquí se podría otorgar la recompensa
    // Por ahora solo marcamos como completado
  }

  try {
    localStorage.setItem('finast-daily-challenge', JSON.stringify(challenge));
  } catch (error) {
    console.error('Error al actualizar progreso del desafío:', error);
  }
}

/**
 * Calcula el tiempo restante del día en horas
 * @returns {number} Horas restantes
 */
export function getTimeRemaining() {
  const now = new Date();
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);
  
  const diff = endOfDay - now;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  
  return hours;
}

