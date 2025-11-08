import { getUnlockedBadges } from '../../utils/progress.js';

/**
 * Componente que muestra insignias desbloqueadas y bloqueadas
 */
export default function BadgeCarousel() {
  const unlockedBadges = getUnlockedBadges();
  
  // Obtener todas las insignias posibles (desbloqueadas y bloqueadas)
  const allBadges = [
    {
      id: "first-step",
      name: "Primer paso",
      description: "Completaste tu primera lección",
      unlocked: unlockedBadges.some(b => b.id === "first-step")
    },
    {
      id: "saver",
      name: "Ahorrista",
      description: "Completaste todas las lecciones de Ahorro básico",
      unlocked: unlockedBadges.some(b => b.id === "saver")
    },
    {
      id: "consistent",
      name: "Constante",
      description: "Mantienes una racha de 3 días o más",
      unlocked: unlockedBadges.some(b => b.id === "consistent")
    },
    {
      id: "dedicated",
      name: "Estudiante dedicado",
      description: "Mantienes una racha de 7 días o más",
      unlocked: unlockedBadges.some(b => b.id === "dedicated")
    },
    {
      id: "budgeter",
      name: "Presupuestador",
      description: "Completaste todas las lecciones de Presupuesto personal",
      unlocked: unlockedBadges.some(b => b.id === "budgeter")
    },
    {
      id: "credit-expert",
      name: "Experto en crédito",
      description: "Completaste todas las lecciones de Deudas y crédito",
      unlocked: unlockedBadges.some(b => b.id === "credit-expert")
    },
    {
      id: "master",
      name: "Maestro financiero",
      description: "Completaste todos los niveles de Finast",
      unlocked: unlockedBadges.some(b => b.id === "master")
    }
  ];

  // Mostrar solo las primeras 6 insignias (3 desbloqueadas + 3 bloqueadas)
  const recentBadges = allBadges.slice(0, 6);

  return (
    <div className="badges-carousel">
      {recentBadges.map(badge => (
        <div 
          key={badge.id} 
          className={`badge-item ${!badge.unlocked ? 'locked' : ''}`}
        >
          <div className="badge-icon">
            {badge.unlocked ? '🏆' : '🔒'}
          </div>
          <span className="badge-name">{badge.name}</span>
        </div>
      ))}
    </div>
  );
}

