import { useState, useEffect } from 'react';
import { getUser, updateUserName, updateUserAvatar, updateUserGoal } from '../data/user.js';
import { useProgress } from '../hooks/useProgress.js';
import BadgeList from '../components/BadgeList.jsx';
import { resetProgress } from '../utils/debug.js';
import { getActiveAvatar } from '../utils/shop.js';
import { getItemById } from '../data/shopItems.js';

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

  const [shopAvatar, setShopAvatar] = useState(null);

  useEffect(() => {
    const activeAvatarId = getActiveAvatar();
    if (activeAvatarId) {
      const avatarItem = getItemById(activeAvatarId);
      if (avatarItem) {
        setShopAvatar(avatarItem.value);
      }
    }
    
    const handleAvatarChange = () => {
      const activeAvatarId = getActiveAvatar();
      if (activeAvatarId) {
        const avatarItem = getItemById(activeAvatarId);
        setShopAvatar(avatarItem ? avatarItem.value : null);
      } else {
        setShopAvatar(null);
      }
    };
    
    window.addEventListener('finast:avatarChanged', handleAvatarChange);
    return () => window.removeEventListener('finast:avatarChanged', handleAvatarChange);
  }, []);

  // Opciones de avatares disponibles
  const avatars = [
    { id: 1, emoji: '👤', path: '/assets/avatar1.png' },
    { id: 2, emoji: '👨', path: '/assets/avatar2.png' },
    { id: 3, emoji: '👩', path: '/assets/avatar3.png' },
  ];
  
  // Usar avatar de la tienda si está activo
  const displayAvatar = shopAvatar || user.avatar;

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
    <div className="page shop-page">
      <div className="shop-header">
        <h1>Mi Perfil</h1>
        <div className="shop-balance">
          <span className="balance-label">Tus puntos:</span>
          <span className="balance-amount">{progress.points}</span>
        </div>
      </div>
      
      <div className="profile-container">
        {/* Hero Section del Perfil */}
        <div className="profile-hero">
          <div className="profile-hero-content">
            <div className="profile-avatar-wrapper">
              <div 
                className="profile-avatar-large"
                onClick={() => setShowAvatarSelector(!showAvatarSelector)}
                title="Cambiar avatar"
              >
                {displayAvatar && displayAvatar.startsWith('/assets/') ? (
                  <img 
                    src={displayAvatar} 
                    alt="Avatar" 
                    className="avatar-image-large"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className="avatar-emoji-large" style={{ display: displayAvatar && displayAvatar.startsWith('/assets/') ? 'none' : 'flex' }}>
                  {shopAvatar || avatars.find(a => a.path === user.avatar)?.emoji || '👤'}
                </div>
                <div className="avatar-edit-badge">
                  <span>Editar</span>
                </div>
              </div>
              {showAvatarSelector && (
                <div className="avatar-selector-popup">
                  <div className="avatar-selector-header">
                    <h4>Seleccionar Avatar</h4>
                    <button 
                      className="avatar-selector-close"
                      onClick={() => setShowAvatarSelector(false)}
                    >
                      ✕
                    </button>
                  </div>
                  <div className="avatar-selector-grid">
                    {avatars.map(avatar => (
                      <button
                        key={avatar.id}
                        className={`avatar-option-large ${user.avatar === avatar.path ? 'selected' : ''}`}
                        onClick={() => handleAvatarSelect(avatar)}
                      >
                        <div className="avatar-option-emoji">{avatar.emoji}</div>
                        {user.avatar === avatar.path && <div className="avatar-selected-check">✓</div>}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="profile-hero-info">
              {isEditingName ? (
                <div className="profile-edit-section">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="profile-edit-input-large"
                    autoFocus
                    placeholder="Tu nombre"
                  />
                  <div className="profile-edit-actions">
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
                </div>
              ) : (
                <div className="profile-name-hero">
                  <h2 className="profile-name-large">{user.name}</h2>
                  <button 
                    className="btn-edit-hero"
                    onClick={() => setIsEditingName(true)}
                    title="Editar nombre"
                  >
                    Editar nombre
                  </button>
                </div>
              )}
              
              <div className="profile-meta">
                <span className="profile-joined-date">
                  Miembro desde {new Date(user.joinedAt).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Meta Financiera */}
        <div className="profile-section">
          <div className="profile-section-header">
            <h3 className="profile-section-title">Mi Meta Financiera</h3>
          </div>
          <div className="shop-item profile-goal-card">
            <div className="shop-item-content">
              {isEditingGoal ? (
                <div className="profile-edit-section">
                  <textarea
                    value={goalInput}
                    onChange={(e) => setGoalInput(e.target.value)}
                    className="profile-edit-textarea"
                    rows="3"
                    autoFocus
                    placeholder="Describe tu meta financiera..."
                  />
                  <div className="profile-edit-actions">
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
                </div>
              ) : (
                <div className="profile-goal-display">
                  <p className="profile-goal-text">{user.goal || 'No has establecido una meta financiera aún.'}</p>
                  <button 
                    className="btn-edit-inline"
                    onClick={() => setIsEditingGoal(true)}
                    title="Editar meta"
                  >
                    Editar meta
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="profile-section">
          <div className="profile-section-header">
            <h3 className="profile-section-title">Estadísticas</h3>
          </div>
          <div className="shop-grid profile-stats-grid">
            <div className="shop-item profile-stat-card">
              <div className="shop-item-header">
                <span className="item-icon">🔥</span>
              </div>
              <div className="shop-item-content">
                <h3 className="item-name">Racha actual</h3>
                <div className="stat-value-large">{progress.streak}</div>
                <p className="stat-description">días consecutivos</p>
              </div>
            </div>
            <div className="shop-item profile-stat-card">
              <div className="shop-item-header">
                <span className="item-icon">⭐</span>
              </div>
              <div className="shop-item-content">
                <h3 className="item-name">Puntos totales</h3>
                <div className="stat-value-large">{progress.points}</div>
                <p className="stat-description">puntos acumulados</p>
              </div>
            </div>
          </div>
        </div>

        {/* Insignias */}
        <div className="profile-section">
          <div className="profile-section-header">
            <h3 className="profile-section-title">Insignias Obtenidas</h3>
          </div>
          <div className="shop-item">
            <div className="shop-item-content">
              <BadgeList />
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="profile-section">
          <div className="shop-item profile-actions-card">
            <div className="shop-item-content">
              <h3 className="item-name">Configuración</h3>
              <p className="item-description">Gestiona tu cuenta y progreso</p>
              <div className="profile-actions">
                <button 
                  className="btn btn-secondary btn-danger"
                  onClick={handleResetProgress}
                >
                  Reiniciar progreso
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

