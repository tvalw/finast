/**
 * Desafíos semanales organizados por nivel de dificultad
 * Cada desafío tiene un avatar, etiqueta, título y descripción
 */

export const weeklyChallenges = {
  easy: [
    {
      id: 'easy-1',
      level: 'Conciencia',
      levelColor: '#22c55e',
      avatar: '🐜',
      label: '🟢 DESAFÍO FÁCIL',
      title: '🎯 Reto Fácil: ¡Safari de Gastos Hormiga!',
      description: '¡Hola equipo! Esta semana, tu misión es solo observar. Anota el 100% de tus "gastos hormiga" (café, snacks, delivery, etc.). No tienes que dejarlos, ¡solo anotarlos!',
      sharePrompt: '¡Comparte en el feed!: ¿Cuál fue el gasto que más te sorprendió o el que más se repitió?',
      rewardPoints: 50
    },
    {
      id: 'easy-2',
      level: 'Conciencia',
      levelColor: '#22c55e',
      avatar: '🎯',
      label: '🟢 DESAFÍO FÁCIL',
      title: '🎯 Reto Fácil: ¡Tu Próxima "Micro-Meta"!',
      description: 'Ahorrar para "un auto" es difícil, pero ahorrar para "unas zapatillas" es más fácil. ¡Definamos una meta de ahorro pequeña y específica que puedas lograr este mes!',
      sharePrompt: '¡Comparte en el feed!: ¿Cuál es tu micro-meta del mes? (Ej: "Juntar $30.000 para el regalo de cumpleaños de mi amigo").',
      rewardPoints: 50
    },
    {
      id: 'easy-3',
      level: 'Conciencia',
      levelColor: '#22c55e',
      avatar: '👻',
      label: '🟢 DESAFÍO FÁCIL',
      title: '🎯 Reto Fácil: ¡Cazando Suscripciones Fantasma!',
      description: '¡Vamos a revisar! Entra a tu estado de cuenta o a la configuración de tu celular (App Store/Play Store) y busca todas tus suscripciones activas.',
      sharePrompt: '¡Comparte en el feed!: ¿Encontraste alguna que ya no usas o que no recordabas? ¡Cuéntanos cuál!',
      rewardPoints: 50
    }
  ],
  medium: [
    {
      id: 'medium-1',
      level: 'Acción',
      levelColor: '#f59e0b',
      avatar: '🚫',
      label: '🟡 DESAFÍO MEDIO',
      title: '🎯 Reto Medio: ¡El Día de "Cero Gasto Variable"!',
      description: '¡Acepta el desafío! Intenta pasar 24 horas completas sin gastos variables (cero compras, cero delivery, cero antojos). Solo se permite lo obligatorio (ej. pagar el pasaje para ir a estudiar/trabajar).',
      sharePrompt: '¡Comparte en el feed!: ¡Publica "¡Reto Logrado! 💪" cuando completes tu día! ¿Fue fácil o difícil?',
      rewardPoints: 100
    },
    {
      id: 'medium-2',
      level: 'Acción',
      levelColor: '#f59e0b',
      avatar: '⏳',
      label: '🟡 DESAFÍO MEDIO',
      title: '🎯 Reto Medio: ¡El "Filtro de 10 Minutos"!',
      description: 'Esta semana, antes de hacer cualquier compra online que no sea esencial, ¡detente! Pon el producto en el carrito y espera 10 minutos antes de pagar.',
      sharePrompt: '¡Comparte en el feed!: ¿Lograste evitar alguna compra impulsiva gracias a los 10 minutos de espera?',
      rewardPoints: 100
    },
    {
      id: 'medium-3',
      level: 'Acción',
      levelColor: '#f59e0b',
      avatar: '💡',
      label: '🟡 DESAFÍO MEDIO',
      title: '🎯 Reto Medio: ¡Tormenta de Ideas!',
      description: 'Pensemos en cómo generar más ingresos. Tómate 15 minutos para anotar 3 cosas que sepas hacer y que alguien podría pagarte (ej: hacer un queque, ordenar un clóset, ayudar con matemáticas).',
      sharePrompt: '¡Comparte en el feed!: ¡Comparte una de tus 3 ideas en el feed! (Quizás a alguien de la comunidad le sirve).',
      rewardPoints: 100
    }
  ],
  hard: [
    {
      id: 'hard-1',
      level: 'Hábito',
      levelColor: '#ef4444',
      avatar: '🧑‍🍳',
      label: '🔴 DESAFÍO DIFÍCIL',
      title: '🎯 Reto Difícil: ¡Semana de "Comida Casera"!',
      description: 'El gran reto: ¡Esta semana, prepara tu almuerzo/comida en casa 5 días seguidos! (Si estudias o trabajas, significa llevar tu comida). Cero delivery, cero comprar comida preparada.',
      sharePrompt: '¡Comparte en el feed!: ¿Lograste los 5 días? ¿Cuánto crees que ahorraste esta semana?',
      rewardPoints: 200
    },
    {
      id: 'hard-2',
      level: 'Hábito',
      levelColor: '#ef4444',
      avatar: '🔥',
      label: '🔴 DESAFÍO DIFÍCIL',
      title: '🎯 Reto Difícil: ¡El Presupuesto a Prueba de Fuego!',
      description: '¡El desafío final! Usa lo aprendido en el Nivel 2 (Presupuesto) y define tu presupuesto 50/30/20 para la semana. ¡El reto es CUMPLIRLO por 5 días seguidos!',
      sharePrompt: '¡Comparte en el feed!: ¿Lograste mantenerte dentro de tu presupuesto? ¿Qué categoría fue la más difícil de respetar?',
      rewardPoints: 200
    },
    {
      id: 'hard-3',
      level: 'Hábito',
      levelColor: '#ef4444',
      avatar: '📦',
      label: '🔴 DESAFÍO DIFÍCIL',
      title: '🎯 Reto Difícil: ¡Modo Vendedor!',
      description: '¡Vamos a generar ingresos extra! Encuentra 3 cosas en tu pieza que ya no uses (ropa, un juego, un libro) y ponlas a la venta esta semana (en Vinted, FB Marketplace, etc.).',
      sharePrompt: '¡Comparte en el feed!: ¡Cuéntanos si lograste vender algo! (Sin poner links de venta, solo la experiencia).',
      rewardPoints: 200
    }
  ]
};

/**
 * Obtiene el desafío semanal actual basado en la semana del año
 * @param {string} difficulty - 'easy', 'medium', o 'hard'
 * @returns {Object} El desafío de la semana
 */
export function getWeeklyChallenge(difficulty = 'easy') {
  const challenges = weeklyChallenges[difficulty] || weeklyChallenges.easy;
  const weekNumber = getCurrentWeekNumber();
  const challengeIndex = (weekNumber - 1) % challenges.length;
  return challenges[challengeIndex];
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
 * Obtiene todos los desafíos de un nivel
 * @param {string} difficulty - 'easy', 'medium', o 'hard'
 * @returns {Array} Array de desafíos
 */
export function getChallengesByLevel(difficulty) {
  return weeklyChallenges[difficulty] || [];
}

