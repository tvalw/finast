/**
 * Consejos rápidos de finanzas para mostrar en la página de inicio
 * Estos consejos generan enganche y motivan a los usuarios a aprender más
 */

export const financialTips = [
  {
    id: 1,
    tip: "Ahorra primero, gasta después. Separa el 10% de tus ingresos antes de pagar cualquier gasto.",
    emoji: "💰"
  },
  {
    id: 2,
    tip: "El interés compuesto es tu mejor aliado. Empieza a invertir joven y deja que el tiempo trabaje para ti.",
    emoji: "📈"
  },
  {
    id: 3,
    tip: "Construye un fondo de emergencia de 3-6 meses de gastos. Es tu red de seguridad financiera.",
    emoji: "🛡️"
  },
  {
    id: 4,
    tip: "Evita las deudas de consumo. Si no puedes pagarlo en efectivo, probablemente no lo necesitas.",
    emoji: "🚫"
  },
  {
    id: 5,
    tip: "Revisa tus gastos mensuales. Los pequeños gastos se acumulan y pueden hacer una gran diferencia.",
    emoji: "🔍"
  },
  {
    id: 6,
    tip: "Paga tus tarjetas de crédito en su totalidad cada mes. Los intereses son tu peor enemigo.",
    emoji: "💳"
  },
  {
    id: 7,
    tip: "Invierte en tu educación financiera. Es la mejor inversión que puedes hacer.",
    emoji: "📚"
  },
  {
    id: 8,
    tip: "Diversifica tus inversiones. No pongas todos los huevos en la misma canasta.",
    emoji: "🥚"
  },
  {
    id: 9,
    tip: "Establece metas financieras claras. Sin un destino, es difícil llegar a algún lugar.",
    emoji: "🎯"
  },
  {
    id: 10,
    tip: "Aprende a decir 'no' a gastos innecesarios. Cada peso ahorrado es un peso ganado.",
    emoji: "✋"
  },
  {
    id: 11,
    tip: "Automatiza tus ahorros. Si no lo ves, no lo gastas.",
    emoji: "⚙️"
  },
  {
    id: 12,
    tip: "Compara precios antes de comprar. Unos minutos de investigación pueden ahorrarte mucho dinero.",
    emoji: "🔎"
  },
  {
    id: 13,
    tip: "Invierte en activos que generen ingresos pasivos. Construye múltiples fuentes de ingresos.",
    emoji: "💎"
  },
  {
    id: 14,
    tip: "Evita las compras impulsivas. Espera 24 horas antes de comprar algo que no necesitas.",
    emoji: "⏰"
  },
  {
    id: 15,
    tip: "Aprende sobre impuestos. Conocer las deducciones puede ahorrarte mucho dinero.",
    emoji: "📊"
  },
  {
    id: 16,
    tip: "Negocia tus salarios y servicios. No tengas miedo de pedir lo que vales.",
    emoji: "💼"
  },
  {
    id: 17,
    tip: "Usa la regla 50/30/20: 50% necesidades, 30% deseos, 20% ahorro e inversión.",
    emoji: "📐"
  },
  {
    id: 18,
    tip: "Revisa tu historial crediticio regularmente. Un buen crédito abre muchas puertas.",
    emoji: "📋"
  },
  {
    id: 19,
    tip: "Invierte en ti mismo. Desarrolla habilidades que aumenten tu valor en el mercado.",
    emoji: "🚀"
  },
  {
    id: 20,
    tip: "Planifica para la jubilación desde joven. Tu yo del futuro te lo agradecerá.",
    emoji: "🌅"
  },
  {
    id: 21,
    tip: "Aprende a vivir por debajo de tus medios. La riqueza se construye con lo que ahorras, no con lo que ganas.",
    emoji: "🏠"
  },
  {
    id: 22,
    tip: "Evita compararte con otros. Enfócate en tu propio progreso financiero.",
    emoji: "👤"
  },
  {
    id: 23,
    tip: "Lee sobre finanzas regularmente. El conocimiento financiero es poder.",
    emoji: "📖"
  },
  {
    id: 24,
    tip: "Usa aplicaciones de presupuesto. Ver tus gastos en tiempo real cambia tu perspectiva.",
    emoji: "📱"
  },
  {
    id: 25,
    tip: "Invierte en experiencias, no solo en cosas. Las experiencias te hacen más feliz a largo plazo.",
    emoji: "🌟"
  }
];

/**
 * Obtiene un consejo aleatorio de la lista
 * @returns {Object} Un consejo aleatorio
 */
export function getRandomTip() {
  const randomIndex = Math.floor(Math.random() * financialTips.length);
  return financialTips[randomIndex];
}

