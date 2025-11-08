import { useState, useEffect } from 'react';
import { getUser, updateUserName, updateUserAvatar, updateUserGoal } from '../data/user.js';
import { useProgress } from '../hooks/useProgress.js';
import BadgeList from '../components/BadgeList.jsx';
import { resetProgress } from '../utils/debug.js';

/**
 * Página de perfil del usuario
 * 
 * Muestra:
 * - Avatar editable (3 opciones)
 * - Nombre y meta financiera editables
 * - Estadísticas (racha, puntos, nivel)
 * - Lista de insignias
 * - Botón para reiniciar progreso
 */
export default function Profile() {
  const [user, setUser] = useState(() => getUser());
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [nameInput, setNameInput] = useState(user.name);
  const [goalInput, setGoalInput] = useState(user.goal);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  
  const progress = useProgress();

  // Opciones de avatares disponibles
  const avatars = [
    { id: 1, emoji: '👤', path: '/assets/avatar1.png' },
    { id: 2, emoji: '👨', path: '/assets/avatar2.png' },
    { id: 3, emoji: '👩', path: '/assets/avatar3.png' },
  ];

  const handleSaveName = () => {
    if (nameInput.trim()) {
      const updatedUser = updateUserName(nameInput.trim());
      setUser(updatedUser);
      setIsEditingName(false);
    }
  };

  const handleSaveGoal = () => {
    if (goalInput.trim()) {
      const updatedUser = updateUserGoal(goalInput.trim());
      setUser(updatedUser);
      setIsEditingGoal(false);
    }
  };

  const handleAvatarSelect = (avatar) => {
    const updatedUser = updateUserAvatar(avatar.path);
    setUser(updatedUser);
    setShowAvatarSelector(false);
  };

  const handleResetProgress = () => {
    const confirmed = window.confirm('¿Estás seguro? Esto borrará todo tu progreso.');
    if (confirmed) {
      resetProgress();
      // Recargar la página para actualizar todo
      window.location.reload();
    }
  };

  return (
    <div className="page">
      <h1>Mi Perfil</h1>
      
      <div className="profile-container">
        {/* Sección de avatar y nombre */}
        <div className="profile-header">
          <div className="avatar-section">
            <div 
              className="avatar-display"
              onClick={() => setShowAvatarSelector(!showAvatarSelector)}
              title="Cambiar avatar"
            >
              <div className="avatar-emoji">
                {avatars.find(a => a.path === user.avatar)?.emoji || '👤'}
              </div>
            </div>
            {showAvatarSelector && (
              <div className="avatar-selector">
                {avatars.map(avatar => (
                  <button
                    key={avatar.id}
                    className={`avatar-option ${user.avatar === avatar.path ? 'selected' : ''}`}
                    onClick={() => handleAvatarSelect(avatar)}
                  >
                    {avatar.emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="profile-info">
            {isEditingName ? (
              <div className="edit-field">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="edit-input"
                  autoFocus
                />
                <button className="btn btn-primary" onClick={handleSaveName}>
                  Guardar
                </button>
                <button className="btn btn-secondary" onClick={() => {
                  setIsEditingName(false);
                  setNameInput(user.name);
                }}>
                  Cancelar
                </button>
              </div>
            ) : (
              <div className="profile-name-section">
                <h2>{user.name}</h2>
                <button 
                  className="btn-edit"
                  onClick={() => setIsEditingName(true)}
                  title="Editar nombre"
                >
                  ✏️
                </button>
              </div>
            )}
            
            {isEditingGoal ? (
              <div className="edit-field">
                <textarea
                  value={goalInput}
                  onChange={(e) => setGoalInput(e.target.value)}
                  className="edit-input"
                  rows="2"
                  autoFocus
                />
                <button className="btn btn-primary" onClick={handleSaveGoal}>
                  Guardar
                </button>
                <button className="btn btn-secondary" onClick={() => {
                  setIsEditingGoal(false);
                  setGoalInput(user.goal);
                }}>
                  Cancelar
                </button>
              </div>
            ) : (
              <div className="profile-goal-section">
                <p className="profile-goal">{user.goal}</p>
                <button 
                  className="btn-edit"
                  onClick={() => setIsEditingGoal(true)}
                  title="Editar meta"
                >
                  ✏️
                </button>
              </div>
            )}
            
            <p className="profile-joined">
              Se unió el {new Date(user.joinedAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="profile-stats">
          <div className="stat-card">
            <div className="stat-icon">🔥</div>
            <div className="stat-value">{progress.streak}</div>
            <div className="stat-label">Racha actual</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-value">{progress.points}</div>
            <div className="stat-label">Puntos</div>
          </div>
        </div>

        {/* Insignias */}
        <div className="profile-badges-section">
          <h3>Insignias obtenidas</h3>
          <BadgeList />
        </div>

        {/* Botón de reiniciar progreso */}
        <div className="profile-actions">
          <button 
            className="btn btn-secondary"
            onClick={handleResetProgress}
          >
            Reiniciar progreso
          </button>
        </div>
      </div>
    </div>
  );
}

