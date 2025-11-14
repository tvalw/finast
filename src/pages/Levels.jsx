import { useState, useEffect, useRef } from 'react';
import LevelMap from '../components/LevelMap.jsx';
import { getMode, setMode } from '../utils/storage.js';

/**
 * Página que muestra el mapa visual interactivo de niveles
 */
export default function Levels() {
  const [currentMode, setCurrentMode] = useState(() => getMode());
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Actualizar modo cuando cambia
  useEffect(() => {
    const handleModeChanged = () => {
      setCurrentMode(getMode());
    };

    window.addEventListener('finast:modeChanged', handleModeChanged);

    return () => {
      window.removeEventListener('finast:modeChanged', handleModeChanged);
    };
  }, []);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Función para obtener el nombre del modo
  const getModeName = (mode) => {
    const modeNames = {
      relaxed: 'Relajado',
      competitive: 'Competitivo',
      learning: 'Aprendizaje'
    };
    return modeNames[mode] || 'Sin modo seleccionado';
  };

  // Función para cambiar el modo
  const handleModeChange = (modeId) => {
    setMode(modeId);
    setCurrentMode(modeId);
    setDropdownOpen(false);
  };

  // Modos disponibles
  const modes = [
    { id: 'relaxed', name: 'Relajado', description: 'Aprende a tu ritmo' },
    { id: 'competitive', name: 'Competitivo', description: 'Con temporizador y puntos extra' },
    { id: 'learning', name: 'Aprendizaje', description: 'Ver respuestas antes de responder' }
  ];

  return (
    <div className="page levels-page">
      <div className="levels-header">
        <div>
          <h1>Niveles de Aprendizaje</h1>
          <p className="page-description">
            Completa las lecciones de cada nivel para desbloquear el siguiente.
          </p>
        </div>
        <div className="mode-selector-section">
          {currentMode && (
            <div className="current-mode-badge">
              <span className="mode-badge-text">{getModeName(currentMode)}</span>
            </div>
          )}
          <div className="levels-dropdown" ref={dropdownRef}>
            <button
              className="btn btn-primary mode-select-btn dropdown-toggle"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
            >
              Cambiar Modo
              <span className="dropdown-arrow">{dropdownOpen ? '▲' : '▼'}</span>
            </button>
            {dropdownOpen && (
              <div className="levels-dropdown-menu">
                {modes.map((mode) => (
                  <button
                    key={mode.id}
                    className={`levels-dropdown-item ${currentMode === mode.id ? 'active' : ''}`}
                    onClick={() => handleModeChange(mode.id)}
                  >
                    <div className="mode-option-content">
                      <span className="mode-option-name">{mode.name}</span>
                      <span className="mode-option-description">{mode.description}</span>
                    </div>
                    {currentMode === mode.id && <span className="mode-check">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <LevelMap />
    </div>
  );
}

