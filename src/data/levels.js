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
    title: "Nivel 1: Endeudamiento responsable",
    description: "Aprende a usar el crédito de forma inteligente evitando riesgos y sobreendeudamiento.",
    lessons: [
      {
        id: "1-1",
        title: "¿Qué es el crédito y cuándo usarlo?",
        content: `El crédito es un acuerdo en el que una institución financiera (como un banco o una cooperativa) te presta dinero para que puedas usarlo hoy y devolverlo en el futuro. Aunque parezca simple, es una de las decisiones financieras más importantes, especialmente para jóvenes que están comenzando a manejar su dinero.

Lo primero que debes saber es que el crédito no es dinero "extra" ni un ingreso nuevo. Cada peso que pides prestado deberá ser devuelto, y casi siempre con intereses. Los intereses son un costo adicional que se cobra por el servicio de prestarte dinero. Mientras más tiempo te demores en pagar o mientras más alta sea la tasa, más terminarás pagando.

El crédito, usado de manera responsable, puede ayudarte a alcanzar metas importantes. Por ejemplo, estudiar una carrera, comprar herramientas para un emprendimiento, financiar una emergencia que no podías prever o incluso construir historial financiero para tener mejores oportunidades más adelante. Cuando se usa bien, el crédito es una herramienta que impulsa tu vida.

Pero cuando se usa mal, puede transformarse en un problema serio. Muchas personas se endeudan por compras impulsivas, por intentar mantener un estilo de vida que no pueden pagar o por no entender cómo funcionan los intereses. Esto provoca estrés, pagos que se vuelven muy altos y dificultades para avanzar en la vida financiera.

Por eso es tan importante entender que pedir crédito significa comprometer tus ingresos futuros. Antes de tomar una decisión, debes preguntarte: "¿Realmente necesito esto?" y "¿Tengo un plan concreto para devolverlo sin complicarme?"

El crédito no es bueno ni malo por sí mismo. Lo que marca la diferencia es cómo lo usas. Cuando lo ocupas con responsabilidad, puede ayudarte a crecer. Cuando lo usas sin información o sin control, puede atraparte en deudas difíciles de manejar.`,
        questions: [
          {
            id: "q1",
            type: "multiple",
            question: "¿Qué es el crédito?",
            options: [
              "Dinero adicional que recibes sin tener que devolver",
              "Un préstamo que debes devolver al futuro, generalmente con intereses",
              "Un regalo que te da el banco por ser cliente",
              "Un ingreso mensual extra"
            ],
            correctOptionIndex: 1,
            explanation: "El crédito siempre es dinero prestado y debe devolverse, normalmente con intereses."
          },
          {
            id: "q2",
            type: "multiple",
            question: "¿Qué puede provocar el mal uso del crédito?",
            options: [
              "Que sea más fácil cumplir metas",
              "Que tengas menos intereses",
              "Problemas como estrés, pagos altos y deudas difíciles de manejar",
              "Que no existan consecuencias"
            ],
            correctOptionIndex: 2,
            explanation: "El mal uso del crédito genera deudas complicadas y afecta la estabilidad financiera."
          },
          {
            id: "q3",
            type: "multiple",
            question: "¿Por qué es importante tener un plan antes de pedir crédito?",
            options: [
              "Porque así puedes devolverlo sin afectar tu vida financiera",
              "Porque el banco lo exige para todos",
              "Porque hace que el crédito sea gratis",
              "Porque evita que pagues intereses"
            ],
            correctOptionIndex: 0,
            explanation: "Tener un plan claro evita endeudarte más de lo que puedes pagar."
          }
        ]
      },
      {
        id: "1-2",
        title: "Tipos de crédito y sus características",
        content: `No todos los créditos funcionan igual. Cada tipo de crédito existe para un propósito distinto y entender estas diferencias es fundamental para elegir bien y no terminar pagando más de lo necesario.

1. Tarjeta de crédito

La tarjeta de crédito es un método de pago que te permite comprar hoy y pagar a fin de mes. Si pagas el total de lo que gastaste, no generas intereses. El problema aparece cuando solo pagas el "mínimo": en ese caso, el banco cobra intereses muy altos y la deuda puede crecer rápidamente. Es una herramienta útil para gastos controlados y compras pequeñas, pero requiere disciplina.

2. Crédito de consumo

Es un préstamo que se pide para pagar compras más grandes, como un computador, muebles, electrodomésticos o incluso un viaje. Tiene cuotas fijas y un plazo definido. Aunque sus intereses son más bajos que los de una tarjeta de crédito, siguen siendo significativos. Lo positivo es que sabes exactamente cuánto pagarás cada mes.

3. Crédito hipotecario

El crédito hipotecario se usa únicamente para comprar una vivienda. Tiene el interés más bajo de todos, pero también los plazos más largos (15 a 30 años). Es un compromiso grande, pero también una herramienta que permite acceder a una casa sin tener que pagarla de inmediato.

4. Crédito educativo

Este tipo de crédito está pensado para financiar estudios superiores. Suele tener condiciones especiales, como tasas más bajas o plazos más largos. El objetivo es que estudiar te permita generar mejores ingresos futuros y puedas pagarlo sin asfixiarte económicamente.

¿Por qué es tan importante conocer estos tipos de crédito?

Porque usar el crédito incorrecto puede costarte mucho dinero. Por ejemplo, financiar un computador con tarjeta de crédito y pagar solo el mínimo puede terminar costando el doble. En cambio, usar un crédito de consumo para lo mismo podría ser mucho más barato.

Entender las diferencias entre los tipos de crédito te permite tomar decisiones inteligentes según tus metas y tu capacidad real de pago.`,
        questions: [
          {
            id: "q4",
            type: "multiple",
            question: "¿Cuál es el principal riesgo de usar una tarjeta de crédito sin pagar el total a fin de mes?",
            options: [
              "Que te cobren una multa por usarla mucho",
              "Que tus compras no acumulan puntos",
              "Que la deuda crezca rápidamente por los altos intereses",
              "Que no puedas volver a usar la tarjeta"
            ],
            correctOptionIndex: 2,
            explanation: "Las tarjetas tienen intereses muy altos cuando dejas saldo pendiente, lo que hace crecer la deuda rápidamente."
          },
          {
            id: "q5",
            type: "multiple",
            question: "¿En qué situación un crédito de consumo es más conveniente que una tarjeta de crédito?",
            options: [
              "Para compras impulsivas del día a día",
              "Para financiar una compra grande con cuotas fijas y claras",
              "Para pagar cuentas pequeñas del mes",
              "Para evitar hacer un presupuesto"
            ],
            correctOptionIndex: 1,
            explanation: "El crédito de consumo está diseñado para compras grandes y tiene condiciones más claras y ordenadas que una tarjeta."
          },
          {
            id: "q6",
            type: "multiple",
            question: "¿Qué característica diferencia al crédito hipotecario de los demás?",
            options: [
              "Tiene la tasa de interés más baja y se usa sólo para vivienda",
              "Se paga en un plazo menor a 6 meses",
              "Es flexible y puede usarse para cualquier cosa",
              "No requiere ningún tipo de compromiso"
            ],
            correctOptionIndex: 0,
            explanation: "El crédito hipotecario es especializado para vivienda y tiene la tasa más baja debido a su garantía y largo plazo."
          },
          {
            id: "q10",
            type: "multiple",
            question: "¿Por qué conocer el tipo de crédito correcto puede ahorrarte mucho dinero?",
            options: [
              "Porque algunos créditos regalan puntos",
              "Porque cada tipo de crédito tiene costos y condiciones diferentes",
              "Porque todos los créditos funcionan igual",
              "Porque el banco siempre recomienda el más barato"
            ],
            correctOptionIndex: 1,
            explanation: "Cada tipo de crédito tiene tasas, plazos y costos distintos; elegir mal puede hacer que pagues mucho más."
          }
        ]
      },
      {
        id: "1-3",
        title: "Cómo evitar el sobreendeudamiento",
        content: `El sobreendeudamiento ocurre cuando una persona debe más dinero del que puede pagar sin afectar su vida diaria. No significa simplemente "tener deudas", sino tener deudas que superan tu capacidad real de pago. Este problema es más común de lo que parece, especialmente entre jóvenes que comienzan a usar créditos sin información suficiente.

Una de las señales más importantes de sobreendeudamiento es pagar solo el mínimo de la tarjeta mes tras mes. Aunque parezca cómodo, en realidad significa que estás aplazando el pago completo y acumulando intereses muy altos. Otra señal de alarma es usar un crédito para pagar otro. Cuando haces eso, no estás resolviendo la deuda: solo la estás trasladando y probablemente haciéndola más cara.

También es una gran alerta cuando no sabes exactamente cuánto debes, cuándo vencen tus pagos o cuál es tu tasa de interés. No tener claridad es un terreno peligroso, porque te impide tomar decisiones informadas y te hace más vulnerable a endeudarte de más sin darte cuenta.

La mejor forma de evitar el sobreendeudamiento es conocer tu capacidad de endeudamiento. Una recomendación muy usada es que el total de tus deudas (incluyendo tarjetas, créditos y cuotas) no supere el 30% de tus ingresos mensuales. De esta manera, tienes espacio para cubrir tus gastos básicos, ahorrar y enfrentar imprevistos sin depender del crédito.

Otra estrategia fundamental es llevar un presupuesto. Registrar lo que ganas y lo que gastas no es aburrido: es una herramienta poderosa para entender tus hábitos y evitar compras impulsivas. Además, revisar tus estados de cuenta regularmente te permite detectar errores, cargos no autorizados o gastos que puedes reducir.

Finalmente, crear un fondo de emergencia reduce la necesidad de pedir crédito ante imprevistos. Si tienes ahorrados incluso uno o dos meses de gastos básicos, evitarás entrar en deudas innecesarias por situaciones inesperadas.`,
        questions: [
          {
            id: "q7",
            type: "multiple",
            question: "¿Qué distingue el sobreendeudamiento de simplemente tener deudas?",
            options: [
              "El sobreendeudamiento implica deudas que superan la capacidad real de pago",
              "Tener cualquier deuda ya significa estar sobreendeudado",
              "Solo ocurre cuando alguien tiene más de una tarjeta",
              "Es un problema exclusivo de personas con bajos ingresos"
            ],
            correctOptionIndex: 0,
            explanation: "Tener deudas no es malo; el problema surge cuando ya no puedes pagarlas sin afectar tu vida diaria."
          },
          {
            id: "q8",
            type: "multiple",
            question: "¿Cuál de las siguientes situaciones es una señal clara de sobreendeudamiento?",
            options: [
              "Pagar el total de la tarjeta cada mes",
              "Llevar un registro de tus gastos",
              "Usar un crédito para pagar otro",
              "Ahorrar una parte de tus ingresos"
            ],
            correctOptionIndex: 2,
            explanation: "Usar un crédito para cubrir otro muestra falta de control y es un síntoma directo de sobreendeudamiento."
          },
          {
            id: "q9",
            type: "multiple",
            question: "¿Por qué pagar solo el mínimo de la tarjeta puede ser peligroso?",
            options: [
              "Porque cancela el historial crediticio",
              "Porque acumulas intereses altos y la deuda crece rápidamente",
              "Porque no puedes usar más la tarjeta",
              "Porque reduce tu ingreso mensual"
            ],
            correctOptionIndex: 1,
            explanation: "El pago mínimo deja la mayor parte de la deuda intacta y genera intereses muy altos."
          },
          {
            id: "q11",
            type: "multiple",
            question: "¿Cuál es la razón principal para mantener las deudas bajo el 30% de los ingresos mensuales?",
            options: [
              "Para que el banco te suba el cupo",
              "Para evitar que tus gastos básicos dependan del crédito",
              "Para usar más tarjetas al mismo tiempo",
              "Porque así nunca tendrás deudas"
            ],
            correctOptionIndex: 1,
            explanation: "Mantener las deudas bajo el 30% permite vivir tranquilo, cubrir gastos y evitar caer en deudas peligrosas."
          },
          {
            id: "q12",
            type: "multiple",
            question: "¿Qué hábito ayuda directamente a prevenir el sobreendeudamiento?",
            options: [
              "Evitar revisar estados de cuenta para no estresarte",
              "Registrar ingresos y gastos para tomar decisiones informadas",
              "Pedir varios créditos pequeños en vez de uno grande",
              "Usar toda la línea de la tarjeta siempre"
            ],
            correctOptionIndex: 1,
            explanation: "Llevar un presupuesto te ayuda a detectar problemas a tiempo y controlar tus gastos."
          }
        ]
      },
      {
        id: "1-4",
        title: "Uso responsable de tarjetas de crédito",
        content: `La tarjeta de crédito es una de las herramientas financieras más comunes, pero también una de las más mal utilizadas. Su principal función es permitirte comprar ahora y pagar a fin de mes. Bien utilizada, puede darte beneficios y ayudarte a manejar tus gastos. Mal usada, puede transformarse en una deuda difícil de controlar debido a sus altos intereses.

La regla más importante es entender que una tarjeta de crédito no es dinero adicional: es crédito. Cada compra que haces es dinero que tendrás que pagar más adelante. Si pagas el total de lo que gastaste antes de la fecha de vencimiento, la tarjeta no genera intereses. Esto significa que la tarjeta puede funcionar como un método de pago muy conveniente y seguro.

El problema comienza cuando solo pagas el mínimo. El pago mínimo es una cantidad muy pequeña que evita que te cobren multas, pero deja la mayor parte de la deuda pendiente. Esa deuda genera intereses que suelen ser los más altos del sistema financiero. Si repites este comportamiento varios meses seguidos, tu deuda puede crecer mucho más rápido de lo que piensas.

Otro aspecto clave del uso responsable es mantener bajo control el cupo disponible. Aunque tengas una línea de crédito grande, no es recomendable usarla completa. Una buena práctica es utilizar menos del 30% del límite. Esto te permite tener margen para emergencias, evitar compras impulsivas y mantener un historial financiero saludable.

Revisar tu estado de cuenta cada mes también es esencial. Ahí puedes ver si hay cargos incorrectos, compras que olvidaste o cobros que podrías evitar. Muchas personas pagan de más sin darse cuenta, simplemente por no revisar esta información.

Finalmente, es importante entender los costos de la tarjeta: intereses, comisiones, cobros por avances en efectivo y períodos de gracia. Conocer estas reglas te ayuda a usar la tarjeta como una herramienta y no como una trampa. Cuando entiendes cómo funciona, puedes aprovechar sus beneficios y evitar los riesgos.`,
        questions: [
          {
            id: "q13",
            type: "multiple",
            question: "¿Cuál es la razón principal por la que el pago mínimo es peligroso?",
            options: [
              "Porque reduce tu acceso a promociones",
              "Porque deja la mayoría de la deuda pendiente, generando intereses muy altos",
              "Porque te impide usar la tarjeta el mes siguiente",
              "Porque baja tu historial crediticio automáticamente"
            ],
            correctOptionIndex: 1,
            explanation: "El pago mínimo mantiene casi toda la deuda activa y genera intereses altos."
          },
          {
            id: "q14",
            type: "multiple",
            question: "¿Qué significa usar menos del 30% del límite de la tarjeta?",
            options: [
              "Que estás usando la tarjeta de manera controlada y saludable",
              "Que estás perdiendo beneficios por no gastar más",
              "Que la tarjeta no te sirve",
              "Que el banco reducirá tu cupo"
            ],
            correctOptionIndex: 0,
            explanation: "Usar poco porcentaje del límite ayuda a mantener control y un mejor historial."
          },
          {
            id: "q15",
            type: "multiple",
            question: "¿Qué sucede si pagas el total de tu tarjeta antes del vencimiento?",
            options: [
              "No pagas intereses",
              "Te cobran una multa",
              "Cambia tu límite automáticamente",
              "Bloquean la tarjeta"
            ],
            correctOptionIndex: 0,
            explanation: "Al pagar el total, evitas intereses completamente."
          },
          {
            id: "q16",
            type: "multiple",
            question: "¿Por qué es importante revisar el estado de cuenta cada mes?",
            options: [
              "Para saber si tienes saldo disponible",
              "Para detectar cargos incorrectos y entender tus gastos",
              "Para pedir un aumento de cupo",
              "Para gastar más el mes siguiente"
            ],
            correctOptionIndex: 1,
            explanation: "Revisar estados de cuenta ayuda a evitar errores, fraudes y gastos innecesarios."
          },
          {
            id: "q17",
            type: "multiple",
            question: "¿Cuál de las siguientes afirmaciones describe mejor una tarjeta de crédito?",
            options: [
              "Es un dinero adicional que puedes gastar sin compromisos",
              "Es un método de pago que funciona como crédito y debe usarse con responsabilidad",
              "Es un premio del banco por ser cliente",
              "Es una herramienta para comprar sin pagar"
            ],
            correctOptionIndex: 1,
            explanation: "La tarjeta es una forma de crédito, no dinero extra."
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Nivel 2: Ahorro",
    description: "Aprende a construir hábitos de ahorro y alcanzar tus metas financieras.",
    locked: true,
    lessons: [
      {
        id: "2-1",
        title: "¿Qué es el ahorro?",
        content: `El ahorro es la parte de tus ingresos que decides guardar en lugar de gastar. Aunque suene simple, es uno de los hábitos financieros más importantes para lograr estabilidad y alcanzar metas. Ahorrar te permite estar preparado ante imprevistos, cumplir objetivos como estudiar, viajar o independizarte, y evitar depender del crédito cuando ocurre una emergencia.

A muchas personas les cuesta ahorrar porque sienten que "no les alcanza", pero ahorrar no significa guardar grandes cantidades. Lo fundamental es hacerlo de manera constante, aunque sea poco. Incluso un pequeño monto mensual, si se mantiene en el tiempo, puede marcar una enorme diferencia.

Un concepto clave es el fondo de emergencia. Este fondo es un ahorro destinado exclusivamente para cubrir situaciones inesperadas: un problema de salud, una reparación urgente o un gasto que no podías prever. Tener este fondo evita que recurras al crédito o te endeudes cuando las cosas se complican. Idealmente, tu fondo de emergencia debería cubrir entre uno y tres meses de tus gastos básicos.

Ahorrar también te ayuda a construir libertad financiera. Cuando ahorras, decides tú qué hacer con tu dinero y no dependes de préstamos. Ahorrar es un hábito que te permite decirle "sí" a tus metas y "no" a las compras impulsivas que te alejan de ellas.`,
        questions: [
          {
            id: "q9",
            type: "multiple",
            question: "¿Qué es el ahorro?",
            options: [
              "Dinero que recibes sin esfuerzo",
              "La parte de tus ingresos que decides guardar",
              "El dinero que gastas en tus deseos",
              "Un crédito que otorga el banco"
            ],
            correctOptionIndex: 1,
            explanation: "El ahorro es dinero que eliges guardar para metas o imprevistos."
          },
          {
            id: "q10",
            type: "multiple",
            question: "¿Cuál es el objetivo principal del fondo de emergencia?",
            options: [
              "Comprar cosas más baratas",
              "Tener dinero reservado para imprevistos",
              "Gastar más sin preocuparte",
              "Aumentar tu cupo de crédito"
            ],
            correctOptionIndex: 1,
            explanation: "El fondo de emergencia evita que recurras al crédito en situaciones inesperadas."
          },
          {
            id: "q11",
            type: "multiple",
            question: "¿Por qué ahorrar incluso pequeñas cantidades puede ser útil?",
            options: [
              "Porque los bancos lo exigen",
              "Porque los montos pequeños, de forma constante, crecen con el tiempo",
              "Porque ahorras más puntos",
              "Porque evita que uses efectivo"
            ],
            correctOptionIndex: 1,
            explanation: "La constancia es más importante que el monto; pequeñas cantidades suman mucho en el tiempo."
          }
        ]
      },
      {
        id: "2-2",
        title: "Cómo desarrollar el hábito de ahorrar",
        content: `Ahorrar no es solo una acción, es un hábito. Para desarrollar ese hábito, lo primero es tener claridad sobre cuánto ganas y cuánto gastas. Muchas veces no ahorramos porque no sabemos realmente en qué se nos va el dinero. Registrar tus gastos, aunque sea por un mes, te ayuda a detectar patrones y oportunidades para ahorrar sin afectar demasiado tu vida diaria.

Un buen método para comenzar es el "págate a ti primero". Este principio consiste en separar una parte de tu dinero apenas recibes tus ingresos, antes de gastar en cualquier otra cosa. Aunque sea un monto pequeño, reservarlo al inicio te asegura que realmente puedas ahorrar y no depender de lo que "sobre".

Otra estrategia útil es definir metas específicas. Es más fácil ahorrar cuando tienes un objetivo concreto: un viaje, un curso, un fondo de emergencia o la compra de algo importante. Las metas claras te mantienen motivado y te ayudan a evitar compras impulsivas.

También es recomendable automatizar el ahorro. Si programas transferencias automáticas a una cuenta de ahorro el mismo día que recibes tus ingresos, evitas la tentación de gastarlo. Ahorrar deja de ser un esfuerzo y se vuelve parte de tu rutina.

Finalmente, es importante recordar que ahorrar no significa privarte de todo. Se trata de encontrar un equilibrio entre disfrutar el presente y construir un futuro más seguro. Ahorrar te da opciones, y tener opciones es una de las formas más valiosas de libertad financiera.`,
        questions: [
          {
            id: "q12",
            type: "multiple",
            question: "¿Qué significa \"págate a ti primero\"?",
            options: [
              "Comprar lo que quieras antes de ahorrar",
              "Separar una parte de tus ingresos para ahorrar antes de gastar",
              "Gastar todo tu ingreso y ahorrar si queda algo",
              "Usar crédito para ahorrar más"
            ],
            correctOptionIndex: 1,
            explanation: "Poner el ahorro como prioridad asegura constancia."
          },
          {
            id: "q13",
            type: "multiple",
            question: "¿Por qué es útil definir metas de ahorro claras?",
            options: [
              "Porque te obliga a gastar más rápido",
              "Porque te ayuda a mantener motivación y disciplina",
              "Porque los bancos lo exigen",
              "Porque así puedes pedir más créditos"
            ],
            correctOptionIndex: 1,
            explanation: "Tener un objetivo concreto hace que ahorrar sea más fácil y motivador."
          },
          {
            id: "q19",
            type: "multiple",
            question: "¿Qué ventaja tiene automatizar el ahorro?",
            options: [
              "Te evita pensar en tus gastos",
              "Hace que el ahorro se cumpla sin tentaciones ni olvidos",
              "Permite gastar más de lo que ganas",
              "Aumenta tu cupo de tarjeta"
            ],
            correctOptionIndex: 1,
            explanation: "Automátizar elimina la tentación de gastarlo antes de ahorrar."
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

