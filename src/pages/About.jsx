import { Link } from 'react-router-dom';

/**
 * Página "Acerca de Finast"
 * Muestra información sobre la plataforma, su misión y cómo funciona
 */
export default function About() {
  return (
    <div className="page about-page">
      <div className="about-container">
        <div className="about-hero">
          <h1>¡Bienvenido a Finast! 💰</h1>
          <h2 className="about-subtitle">Finanzas sin Estrés</h2>
        </div>

        <div className="about-content">
          <section className="about-section">
            <p className="about-intro">
              ¿Hablemos de dinero? ¿Suena abrumador? Es normal.
            </p>
            <p>
              Las finanzas personales a menudo se sienten como un laberinto complicado, lleno de palabras raras y reglas estresantes. Especialmente cuando eres joven y recién comienzas a manejar tu primera mesada, tu primer sueldo o simplemente quieres ahorrar para esa meta soñada.
            </p>
          </section>

          <section className="about-section">
            <h3 className="about-section-title">🎯 Nuestra Misión: Aprender Finanzas como un Juego</h3>
            <p>
              En Finast, creemos que aprender sobre ahorro, presupuesto e inversión no tiene por qué ser aburrido ni intimidante.
            </p>
            <p>
              Nacimos para cambiar esa historia. Nuestra misión es hacer que la educación financiera sea tan fácil, divertida y adictiva como tu juego o app favorita. Dejamos atrás las clases largas y te damos lecciones que puedes hacer en 5 minutos en tu celular.
            </p>
          </section>

          <section className="about-section">
            <h3 className="about-section-title">💡 ¿Cómo lo hacemos?</h3>
            <p>
              Finast es una plataforma web de educación financiera que transforma conceptos complejos en una experiencia de aprendizaje simple y gamificada.
            </p>

            <div className="about-features">
              <div className="about-feature">
                <div className="feature-icon">🎮</div>
                <div className="feature-content">
                  <h4>Aprende jugando</h4>
                  <p>
                    En lugar de leer textos eternos, completarás micro-lecciones, ganarás puntos, mantendrás tus "rachas" 🔥, desbloquearás "logros" 🏆 y verás tu progreso visualmente.
                  </p>
                </div>
              </div>

              <div className="about-feature">
                <div className="feature-icon">🤖</div>
                <div className="feature-content">
                  <h4>Conoce a nuestra mascota</h4>
                  <p>
                    Nuestro guía, te acompañará en cada paso. Te dará tips, te animará y te demostrará que puedes construir tu futuro financiero de forma calmada y "zen".
                  </p>
                </div>
              </div>

              <div className="about-feature">
                <div className="feature-icon">📊</div>
                <div className="feature-content">
                  <h4>Un plan solo para ti</h4>
                  <p>
                    No todos somos iguales. Con nuestro "Perfilador Financiero", la plataforma te hace recomendaciones adaptadas a tu edad, tu ocupación (estudiante o trabajador) y tus objetivos personales.
                  </p>
                </div>
              </div>

              <div className="about-feature">
                <div className="feature-icon">👥</div>
                <div className="feature-content">
                  <h4>No estás solo</h4>
                  <p>
                    Aprender es mejor en equipo. En nuestra "Comunidad", puedes compartir tus logros, hacer preguntas y ver que no eres el único que está aprendiendo.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h3 className="about-section-title">🚀 ¿Quiénes somos? (Un proyecto TRL 3)</h3>
            <p>
              Finast es un proyecto en crecimiento. Actualmente, somos un prototipo de Prueba de Concepto (TRL 3), desarrollado con cariño por estudiantes de ingeniería.
            </p>
            <p>
              Nuestro objetivo principal en esta etapa es validar esta nueva forma de aprender. Por eso, tu opinión es clave. Cada vez que usas el formulario de feedback o participas en la comunidad, ¡nos ayudas a construir la mejor plataforma de finanzas para jóvenes!
            </p>
          </section>

          <section className="about-cta">
            <h3 className="about-cta-title">¿Listo/a para construir tu futuro financiero?</h3>
            <div className="about-cta-buttons">
              <Link to="/levels" className="btn btn-primary btn-large">
                Comenzar a aprender
              </Link>
              <Link to="/community" className="btn btn-secondary btn-large">
                Ver la comunidad
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

