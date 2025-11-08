import { useState, useEffect } from 'react';
import DailyChallenge from './DailyChallenge.jsx';
import QuickActions from './QuickActions.jsx';
import { getWidgetsState, saveWidgetsState } from '../../utils/storage.js';

/**
 * Contenedor de widgets flotantes con funcionalidad de minimizar/mostrar
 * El estado se guarda en localStorage
 */
export default function FloatingWidgets() {
  const savedState = getWidgetsState();
  const [challengeMinimized, setChallengeMinimized] = useState(savedState.challengeMinimized);
  const [quickActionsMinimized, setQuickActionsMinimized] = useState(savedState.quickActionsMinimized);

  // Guardar en localStorage cuando cambie el estado
  useEffect(() => {
    saveWidgetsState(challengeMinimized, quickActionsMinimized);
  }, [challengeMinimized, quickActionsMinimized]);

  return (
    <div className="floating-widgets">
      {/* Desafío del Día */}
      <div className={`floating-widget floating-challenge ${challengeMinimized ? 'minimized' : ''}`}>
        <div className="widget-header">
          <span className="widget-title">🏅 Desafío del Día</span>
          <button
            className="widget-toggle"
            onClick={() => setChallengeMinimized(!challengeMinimized)}
            aria-label={challengeMinimized ? 'Mostrar desafío' : 'Ocultar desafío'}
          >
            {challengeMinimized ? '▲' : '▼'}
          </button>
        </div>
        {!challengeMinimized && (
          <div className="widget-content">
            <DailyChallenge />
          </div>
        )}
      </div>

      {/* Acceso Rápido */}
      <div className={`floating-widget floating-quick-actions ${quickActionsMinimized ? 'minimized' : ''}`}>
        <div className="widget-header">
          <span className="widget-title">Acceso Rápido</span>
          <button
            className="widget-toggle"
            onClick={() => setQuickActionsMinimized(!quickActionsMinimized)}
            aria-label={quickActionsMinimized ? 'Mostrar acceso rápido' : 'Ocultar acceso rápido'}
          >
            {quickActionsMinimized ? '▲' : '▼'}
          </button>
        </div>
        {!quickActionsMinimized && (
          <div className="widget-content">
            <QuickActions />
          </div>
        )}
      </div>
    </div>
  );
}

