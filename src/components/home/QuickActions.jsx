import { useNavigate } from 'react-router-dom';

/**
 * Componente de acciones rápidas para acceso directo a secciones clave
 * Versión compacta sin emojis
 */
export default function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      id: 'progress',
      label: 'Progreso',
      action: () => navigate('/progress')
    },
    {
      id: 'practice',
      label: 'Niveles',
      action: () => navigate('/levels')
    },
    {
      id: 'resources',
      label: 'Recursos',
      action: () => navigate('/resources')
    },
    {
      id: 'profile',
      label: 'Perfil',
      action: () => navigate('/profile')
    }
  ];

  return (
    <div className="quick-actions-compact">
      {actions.map(action => (
        <button
          key={action.id}
          className="quick-action-compact"
          onClick={action.action}
          title={action.label}
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}

