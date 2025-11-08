/**
 * Componente de estadísticas diarias
 * Muestra racha, puntos y lecciones completadas en tarjetas visuales
 */
export default function DailyStats({ stats }) {
  return (
    <div className="daily-stats">
      <div className="stat-card">
        <div className="stat-number">{stats.streak}</div>
        <div className="stat-label">Días de racha 🔥</div>
      </div>
      <div className="stat-card">
        <div className="stat-number">{stats.points}</div>
        <div className="stat-label">Puntos totales ⭐</div>
      </div>
      <div className="stat-card">
        <div className="stat-number">{stats.completedLessons}</div>
        <div className="stat-label">Lecciones completadas ✅</div>
      </div>
    </div>
  );
}

