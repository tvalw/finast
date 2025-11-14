import { Link } from 'react-router-dom';

/**
 * Componente Footer de la aplicación
 * Muestra información sobre Finast, enlaces útiles y redes sociales
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-container">
        {/* Sección principal del footer */}
        <div className="footer-content">
          {/* Información de la app */}
          <div className="footer-section">
            <h3 className="footer-logo">Finast</h3>
            <p className="footer-description">
              Tu plataforma de educación financiera. Aprende, practica y transforma tu relación con el dinero.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div className="footer-section">
            <h4 className="footer-title">Navegación</h4>
            <ul className="footer-links">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/levels">Niveles</Link></li>
              <li><Link to="/progress">Progreso</Link></li>
              <li><Link to="/profile">Perfil</Link></li>
              <li><Link to="/shop">Tienda</Link></li>
            </ul>
          </div>

          {/* Recursos */}
          <div className="footer-section">
            <h4 className="footer-title">Recursos</h4>
            <ul className="footer-links">
              <li><Link to="/resources">Recursos de Aprendizaje</Link></li>
              <li><Link to="/glossary">Diccionario</Link></li>
              <li><Link to="/simulator">Simulador</Link></li>
              <li><Link to="/community">Comunidad</Link></li>
            </ul>
          </div>

          {/* Información */}
          <div className="footer-section">
            <h4 className="footer-title">Información</h4>
            <ul className="footer-links">
              <li><Link to="/about">Acerca de Finast</Link></li>
              <li><a href="#help" onClick={(e) => e.preventDefault()}>Ayuda</a></li>
              <li><a href="#contact" onClick={(e) => e.preventDefault()}>Contacto</a></li>
            </ul>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="footer-divider"></div>

        {/* Copyright y redes sociales */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>&copy; {currentYear} Finast. Todos los derechos reservados.</p>
            <p className="footer-tagline">Educación financiera para todos</p>
          </div>
          <div className="footer-social">
            <span className="social-label">Síguenos:</span>
            <div className="social-icons">
              <a href="#" className="social-icon" aria-label="Facebook" onClick={(e) => e.preventDefault()}>
                Facebook
              </a>
              <a href="#" className="social-icon" aria-label="Twitter" onClick={(e) => e.preventDefault()}>
                Twitter
              </a>
              <a href="#" className="social-icon" aria-label="Instagram" onClick={(e) => e.preventDefault()}>
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

