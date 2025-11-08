/**
 * Datos de niveles, lecciones y preguntas para Finast
 * 
 * Cada nivel contiene:
 * - id: número único del nivel
 * - title: título del nivel
 * - description: descripción breve
 * - locked: true si el nivel está bloqueado (opcional, por defecto false)
 * - lessons: array de lecciones
 * 
 * Cada lección contiene:
 * - id: identificador único (formato "nivel-lección")
 * - title: título de la lección
 * - content: texto educativo largo (opcional, si no existe se salta directo al quiz)
 * - questions: array de preguntas
 * 
 * Cada pregunta puede ser:
 * - type: "multiple" o "truefalse"
 * - question: texto de la pregunta
 * - Para múltiple: options (array) y correctOptionIndex (número)
 * - Para verdadero/falso: answer (true/false)
 * - explanation: explicación que se muestra después de responder
 */

export const levels = [
  {
    id: 1,
    title: "Nivel 1: Ahorro básico",
    description: "Aprende los conceptos fundamentales del ahorro y cómo empezar.",
    lessons: [
      {
        id: "1-1",
        title: "¿Qué es ahorrar?",
        content: `Concepto principal

Ahorrar significa guardar una parte de tu dinero en lugar de gastarlo todo.

Aprende esto:

- No es cuánto ganas, es cuánto puedes guardar.
- Lo ideal es ahorrar al menos el 10% de tus ingresos.
- Empieza con poco pero sé constante.`,
        questions: [
          {
            id: "q1",
            type: "multiple",
            question: "¿Qué significa ahorrar?",
            options: [
              "Gastar todo el sueldo",
              "Separar una parte de los ingresos para una meta futura",
              "Pedir un crédito de consumo",
              "Comprar solo con tarjeta"
            ],
            correctOptionIndex: 1,
            explanation: "Ahorrar es reservar parte de tus ingresos para objetivos o emergencias. Es la base de una buena salud financiera."
          },
          {
            id: "q2",
            type: "truefalse",
            question: "Solo se puede ahorrar cuando ganas mucho dinero.",
            answer: false,
            explanation: "Se puede ahorrar con montos pequeños si eres constante. Lo importante es crear el hábito, no la cantidad inicial."
          },
          {
            id: "q3",
            type: "multiple",
            question: "¿Cuál es el porcentaje recomendado para ahorrar del sueldo?",
            options: [
              "5%",
              "10-20%",
              "50%",
              "No hay porcentaje recomendado"
            ],
            correctOptionIndex: 1,
            explanation: "Se recomienda ahorrar entre el 10% y 20% de los ingresos. Empieza con lo que puedas y aumenta gradualmente."
          }
        ]
      },
      {
        id: "1-2",
        title: "Metas de ahorro (corto y largo plazo)",
        content: `Tipos de metas

Las metas de ahorro se dividen en dos categorías principales según el tiempo que necesitas para alcanzarlas.

Metas de corto plazo (3-6 meses):
- Vacaciones o viajes
- Compras específicas (electrodomésticos, muebles)
- Fondo de emergencia inicial
- Eventos especiales

Metas de largo plazo (más de 1 año):
- Compra de vivienda
- Educación universitaria
- Jubilación
- Inversiones importantes

Consejos importantes:
- Define metas claras y específicas
- Establece fechas límite realistas
- Calcula cuánto necesitas ahorrar mensualmente
- Usa herramientas como el ahorro automático`,
        questions: [
          {
            id: "q4",
            type: "multiple",
            question: "¿Cuál es un buen ejemplo de meta de corto plazo?",
            options: [
              "Jubilar a los 65",
              "Comprar una casa",
              "Ahorrar para un viaje en 3 meses",
              "Invertir en la bolsa"
            ],
            correctOptionIndex: 2,
            explanation: "Las metas de corto plazo suelen ser de 3 a 6 meses. Ejemplos: vacaciones, emergencias, compras pequeñas."
          },
          {
            id: "q5",
            type: "truefalse",
            question: "Las metas de largo plazo requieren más disciplina y planificación.",
            answer: true,
            explanation: "Correcto. Las metas de largo plazo (como comprar casa o jubilación) requieren planificación detallada y constancia."
          },
          {
            id: "q6",
            type: "multiple",
            question: "¿Qué herramienta es útil para alcanzar metas de ahorro?",
            options: [
              "Solo guardar dinero bajo el colchón",
              "Crear un presupuesto y separar el ahorro automáticamente",
              "Pedir préstamos",
              "Gastar primero y ahorrar lo que sobra"
            ],
            correctOptionIndex: 1,
            explanation: "Un presupuesto y el ahorro automático (transferir dinero apenas recibes el sueldo) son las mejores herramientas."
          }
        ]
      },
      {
        id: "1-3",
        title: "Fondo de emergencia",
        content: `¿Qué es un fondo de emergencia?

Un fondo de emergencia es dinero que guardas específicamente para cubrir gastos inesperados o situaciones de crisis financiera.

¿Cuánto deberías tener?

La recomendación general es tener entre 3 y 6 meses de tus gastos mensuales. Esto te protege en caso de:
- Pérdida de empleo
- Emergencias médicas
- Reparaciones urgentes del hogar o vehículo
- Gastos imprevistos

Características importantes:
- Debe estar en una cuenta de fácil acceso (no invertido)
- Debe ser líquido (puedes retirarlo rápidamente)
- No debe usarse para gastos no urgentes
- Debe ser lo primero que construyas antes de otros ahorros

Recuerda: El fondo de emergencia es tu red de seguridad financiera.`,
        questions: [
          {
            id: "q7",
            type: "multiple",
            question: "¿Cuánto debería tener en un fondo de emergencia?",
            options: [
              "1 mes de gastos",
              "3-6 meses de gastos",
              "1 año de gastos",
              "No es necesario tener fondo de emergencia"
            ],
            correctOptionIndex: 1,
            explanation: "Se recomienda tener entre 3 y 6 meses de gastos en un fondo de emergencia para cubrir imprevistos."
          },
          {
            id: "q8",
            type: "truefalse",
            question: "El fondo de emergencia debe estar en una cuenta de fácil acceso.",
            answer: true,
            explanation: "Sí, debe estar en una cuenta de fácil acceso (no invertido) para poder usarlo rápidamente cuando lo necesites."
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Nivel 2: Presupuesto personal",
    description: "Aprende a ordenar tus ingresos y gastos.",
    locked: true,
    lessons: [
      {
        id: "2-1",
        title: "Ingresos vs gastos",
        content: `Entendiendo tus finanzas

Para tener control financiero, primero debes entender la diferencia entre ingresos y gastos.

Ingresos:
Son todo el dinero que recibes. Pueden ser:
- Sueldo o salario fijo
- Ingresos por trabajos independientes
- Bonos o comisiones
- Ingresos por inversiones

Gastos fijos:
Son gastos que pagas todos los meses y casi no varían:
- Arriendo o hipoteca
- Servicios básicos (luz, agua, gas)
- Planes de teléfono e internet
- Seguros
- Educación

Gastos variables:
Son gastos que cambian cada mes:
- Alimentación
- Entretenimiento
- Transporte
- Compras personales

La regla 50/30/20:
- 50% para necesidades (gastos fijos esenciales)
- 30% para deseos (gastos variables y entretenimiento)
- 20% para ahorro e inversión`,
        questions: [
          {
            id: "q9",
            type: "multiple",
            question: "¿Qué es un gasto fijo?",
            options: [
              "Un gasto que cambia todos los días",
              "Un gasto que es opcional",
              "Un gasto que pagas todos los meses y casi no varía",
              "Un ahorro automático"
            ],
            correctOptionIndex: 2,
            explanation: "Los gastos fijos son recurrentes, como arriendo, plan de teléfono, colegio. Son predecibles y necesarios."
          },
          {
            id: "q10",
            type: "truefalse",
            question: "Los gastos variables son más fáciles de controlar que los fijos.",
            answer: true,
            explanation: "Correcto. Los gastos variables (como entretenimiento, comida fuera) son más fáciles de ajustar que los fijos."
          },
          {
            id: "q11",
            type: "multiple",
            question: "¿Cuál es la regla 50/30/20?",
            options: [
              "50% gastos, 30% ahorro, 20% inversión",
              "50% necesidades, 30% deseos, 20% ahorro",
              "50% ingresos, 30% gastos, 20% deudas",
              "No existe tal regla"
            ],
            correctOptionIndex: 1,
            explanation: "La regla 50/30/20 sugiere: 50% en necesidades, 30% en deseos y 20% en ahorro e inversión."
          }
        ]
      },
      {
        id: "2-2",
        title: "Cómo hacer un presupuesto",
        content: `Pasos para crear tu presupuesto

Un presupuesto es un plan que te ayuda a controlar tus finanzas y alcanzar tus metas.

Paso 1: Calcula tus ingresos totales
Suma todos los ingresos que recibes mensualmente.

Paso 2: Lista todos tus gastos
Anota cada gasto, desde el más grande hasta el más pequeño. No olvides los gastos pequeños, se acumulan.

Paso 3: Categoriza tus gastos
Separa entre gastos fijos, variables y ahorros.

Paso 4: Ajusta según tus metas
Si gastas más de lo que ganas, identifica dónde puedes reducir gastos.

Paso 5: Revisa mensualmente
Tu presupuesto debe ser flexible y ajustarse a cambios en tu vida.

Consejos:
- Sé realista con tus gastos
- Incluye siempre una categoría de ahorro
- Usa aplicaciones o hojas de cálculo para facilitar el seguimiento
- No te desanimes si al principio no cuadra perfecto`,
        questions: [
          {
            id: "q12",
            type: "multiple",
            question: "¿Con qué frecuencia deberías revisar tu presupuesto?",
            options: [
              "Una vez al año",
              "Mensualmente",
              "Nunca",
              "Solo cuando tengas problemas"
            ],
            correctOptionIndex: 1,
            explanation: "Revisar el presupuesto mensualmente te permite ajustarlo según cambios en ingresos o gastos."
          },
          {
            id: "q13",
            type: "truefalse",
            question: "Un presupuesto debe ser flexible y ajustarse a cambios en tu vida.",
            answer: true,
            explanation: "Sí, un buen presupuesto es flexible y se adapta a cambios como nuevos ingresos, gastos inesperados o cambios de prioridades."
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Nivel 3: Deudas y crédito responsable",
    description: "Aprende a usar el crédito sin sobreendeudarte.",
    locked: true,
    lessons: [
      {
        id: "3-1",
        title: "Tipos de deudas",
        content: `Deudas buenas vs deudas malas

No todas las deudas son iguales. Aprender a diferenciarlas es clave para una buena salud financiera.

Deudas "buenas":
Son inversiones que aumentan tu patrimonio o ingresos futuros:
- Préstamos para educación (mejora tus ingresos potenciales)
- Hipoteca para vivienda (construyes patrimonio)
- Préstamos para iniciar un negocio (genera ingresos)
- Inversiones que se valorizan con el tiempo

Deudas "malas":
Son deudas que no generan valor y solo consumen tus recursos:
- Tarjetas de crédito para gastos innecesarios
- Créditos de consumo para bienes que se deprecian
- Préstamos para vacaciones o entretenimiento
- Deudas con intereses muy altos

Estrategias para pagar deudas:
- Método avalancha: paga primero las deudas con mayor interés
- Método bola de nieve: paga primero las deudas más pequeñas (motivación psicológica)
- Nunca uses una deuda para pagar otra (a menos que sea refinanciación inteligente)`,
        questions: [
          {
            id: "q14",
            type: "multiple",
            question: "¿Cuál es una deuda 'buena'?",
            options: [
              "Tarjeta de crédito para compras innecesarias",
              "Préstamo para educación o vivienda",
              "Crédito de consumo para ropa",
              "Todas las deudas son malas"
            ],
            correctOptionIndex: 1,
            explanation: "Las deudas 'buenas' son inversiones que aumentan tu patrimonio o ingresos, como educación o vivienda."
          },
          {
            id: "q15",
            type: "truefalse",
            question: "Es mejor pagar primero las deudas con mayor interés.",
            answer: true,
            explanation: "Sí, priorizar deudas con mayor interés (método avalancha) te ahorra más dinero a largo plazo."
          }
        ]
      },
      {
        id: "3-2",
        title: "Uso responsable de tarjetas de crédito",
        content: `Cómo usar tu tarjeta de crédito correctamente

Las tarjetas de crédito pueden ser herramientas útiles si las usas responsablemente, o trampas costosas si no.

Reglas de oro:
1. Paga el total cada mes
   - Nunca dejes saldo pendiente
   - Evita pagar solo el mínimo
   - Los intereses de tarjeta son muy altos

2. Úsala como método de pago, no como préstamo
   - Solo gasta lo que puedes pagar en efectivo
   - Trátala como dinero que ya tienes

3. Construye tu historial crediticio
   - Usar crédito responsablemente mejora tu historial
   - Un buen historial te ayuda a obtener mejores préstamos
   - Paga siempre a tiempo

4. Conoce tus límites
   - No uses más del 30% de tu límite de crédito
   - Ten solo las tarjetas que realmente necesitas
   - Revisa tus estados de cuenta regularmente

Beneficios del uso responsable:
- Construyes un buen historial crediticio
- Puedes acceder a mejores tasas de interés
- Tienes protección en compras
- Puedes ganar recompensas o millas`,
        questions: [
          {
            id: "q16",
            type: "multiple",
            question: "¿Cuál es el uso ideal de una tarjeta de crédito?",
            options: [
              "Gastar hasta el límite cada mes",
              "Pagar solo el mínimo",
              "Usarla como método de pago y pagar el total cada mes",
              "No usarla nunca"
            ],
            correctOptionIndex: 2,
            explanation: "Usa la tarjeta como método de pago conveniente, pero paga el total cada mes para evitar intereses."
          },
          {
            id: "q17",
            type: "truefalse",
            question: "El historial crediticio se construye usando crédito responsablemente.",
            answer: true,
            explanation: "Correcto. Un buen historial crediticio se construye pagando a tiempo y usando el crédito de forma responsable."
          }
        ]
      }
    ]
  }
];

