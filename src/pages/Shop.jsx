import { useState, useEffect } from 'react';
import { useProgress } from '../hooks/useProgress.js';
import { shopItems, getItemsByCategory, getCategories, getCategoryName } from '../data/shopItems.js';
import { getPurchasedItems, isItemPurchased, purchaseItem, setActiveTheme, getActiveTheme, setActiveAvatar, getActiveAvatar, toggleEffect, getActiveEffects, applyTheme, removeTheme, toggleNavbarEffect, getActiveNavbarEffects, toggleBackgroundEffect, getActiveBackgroundEffects } from '../utils/shop.js';
import { addPoints } from '../utils/storage.js';

/**
 * Página de tienda donde se pueden comprar personalizaciones con puntos
 */
export default function Shop() {
  const progress = useProgress();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [purchasedItems, setPurchasedItems] = useState(() => getPurchasedItems());
  const [activeTheme, setActiveThemeState] = useState(() => getActiveTheme());
  const [activeAvatar, setActiveAvatarState] = useState(() => getActiveAvatar());
  const [activeEffects, setActiveEffects] = useState(() => getActiveEffects());
  const [activeNavbarEffects, setActiveNavbarEffects] = useState(() => getActiveNavbarEffects());
  const [activeBackgroundEffects, setActiveBackgroundEffects] = useState(() => getActiveBackgroundEffects());
  const [purchaseMessage, setPurchaseMessage] = useState(null);

  const categories = getCategories();
  const filteredItems = selectedCategory === 'all' 
    ? shopItems 
    : getItemsByCategory(selectedCategory);

  // Actualizar cuando cambia localStorage
  useEffect(() => {
    const updateShop = () => {
      setPurchasedItems(getPurchasedItems());
      setActiveThemeState(getActiveTheme());
      setActiveAvatarState(getActiveAvatar());
      setActiveEffects(getActiveEffects());
      setActiveNavbarEffects(getActiveNavbarEffects());
      setActiveBackgroundEffects(getActiveBackgroundEffects());
    };

    const handleStorageChange = () => updateShop();
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('finast:pointsUpdated', updateShop);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('finast:pointsUpdated', updateShop);
    };
  }, []);

  const handlePurchase = (item) => {
    if (isItemPurchased(item.id)) {
      setPurchaseMessage({ type: 'info', text: 'Ya tienes este item' });
      setTimeout(() => setPurchaseMessage(null), 3000);
      return;
    }

    if (progress.points < item.price) {
      setPurchaseMessage({ type: 'error', text: 'No tienes suficientes puntos' });
      setTimeout(() => setPurchaseMessage(null), 3000);
      return;
    }

    // Comprar el item
    if (purchaseItem(item.id)) {
      // Restar puntos (usar negativo para restar)
      addPoints(-item.price);
      
      setPurchaseMessage({ type: 'success', text: `¡${item.name} comprado!` });
      setTimeout(() => setPurchaseMessage(null), 3000);
      
      setPurchasedItems(getPurchasedItems());
      
      // Si es un tema o avatar, activarlo automáticamente
      if (item.type === 'theme') {
        setActiveTheme(item.id);
        setActiveThemeState(item.id);
      } else if (item.type === 'avatar') {
        setActiveAvatar(item.id);
        setActiveAvatarState(item.id);
      } else if (item.type === 'effect') {
        toggleEffect(item.value);
        setActiveEffects(getActiveEffects());
      } else if (item.type === 'navbar') {
        toggleNavbarEffect(item.value);
        setActiveNavbarEffects(getActiveNavbarEffects());
      } else if (item.type === 'background') {
        toggleBackgroundEffect(item.value);
        setActiveBackgroundEffects(getActiveBackgroundEffects());
      }
    }
  };

  const handleActivate = (item) => {
    if (!isItemPurchased(item.id)) return;

    if (item.type === 'theme') {
      const newTheme = activeTheme === item.id ? null : item.id;
      setActiveTheme(newTheme);
      setActiveThemeState(newTheme);
      if (newTheme) {
        applyTheme(newTheme);
      } else {
        removeTheme();
      }
    } else if (item.type === 'avatar') {
      const newAvatar = activeAvatar === item.id ? null : item.id;
      setActiveAvatar(newAvatar);
      setActiveAvatarState(newAvatar);
    } else if (item.type === 'effect') {
      toggleEffect(item.value);
      setActiveEffects(getActiveEffects());
    } else if (item.type === 'navbar') {
      toggleNavbarEffect(item.value);
      setActiveNavbarEffects(getActiveNavbarEffects());
    } else if (item.type === 'background') {
      toggleBackgroundEffect(item.value);
      setActiveBackgroundEffects(getActiveBackgroundEffects());
    }
  };

  return (
    <div className="page shop-page">
      <div className="shop-header">
        <h1>🛍️ Tienda de Puntos</h1>
        <div className="shop-balance">
          <span className="balance-label">Tus puntos:</span>
          <span className="balance-amount">⭐ {progress.points}</span>
        </div>
      </div>

      {purchaseMessage && (
        <div className={`purchase-message ${purchaseMessage.type}`}>
          {purchaseMessage.text}
        </div>
      )}

      {/* Filtros por categoría */}
      <div className="shop-filters">
        <button
          className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('all')}
        >
          Todos
        </button>
        {categories.map(category => (
          <button
            key={category}
            className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {getCategoryName(category)}
          </button>
        ))}
      </div>

      {/* Grid de items */}
      <div className="shop-grid">
        {filteredItems.map(item => {
          const purchased = isItemPurchased(item.id);
          const isActive = 
            (item.type === 'theme' && activeTheme === item.id) ||
            (item.type === 'avatar' && activeAvatar === item.id) ||
            (item.type === 'effect' && activeEffects.includes(item.value)) ||
            (item.type === 'navbar' && activeNavbarEffects.includes(item.value)) ||
            (item.type === 'background' && activeBackgroundEffects.includes(item.value));
          const canAfford = progress.points >= item.price;

          return (
            <div 
              key={item.id} 
              className={`shop-item ${purchased ? 'purchased' : ''} ${isActive ? 'active' : ''} ${!canAfford && !purchased ? 'insufficient' : ''}`}
            >
              <div className="shop-item-header">
                <span className="item-icon">{item.icon}</span>
                {purchased && <span className="purchased-badge">✓</span>}
                {isActive && <span className="active-badge">Activo</span>}
              </div>
              
              <div className="shop-item-content">
                <h3 className="item-name">{item.name}</h3>
                <p className="item-description">{item.description}</p>
                
                {item.type === 'theme' && item.preview && (
                  <div className="theme-preview">
                    <div 
                      className="preview-color" 
                      style={{ backgroundColor: item.preview.primary }}
                      title="Color primario"
                    ></div>
                    <div 
                      className="preview-color" 
                      style={{ backgroundColor: item.preview.secondary }}
                      title="Color secundario"
                    ></div>
                    <div 
                      className="preview-color" 
                      style={{ backgroundColor: item.preview.accent }}
                      title="Color acento"
                    ></div>
                  </div>
                )}
              </div>

              <div className="shop-item-footer">
                <div className="item-price">
                  <span className="price-icon">⭐</span>
                  <span className="price-amount">{item.price}</span>
                </div>
                
                <div className="item-actions">
                  {purchased ? (
                    <button
                      className={`action-btn ${isActive ? 'deactivate' : 'activate'}`}
                      onClick={() => handleActivate(item)}
                    >
                      {isActive ? 'Desactivar' : 'Activar'}
                    </button>
                  ) : (
                    <button
                      className={`action-btn purchase ${!canAfford ? 'disabled' : ''}`}
                      onClick={() => handlePurchase(item)}
                      disabled={!canAfford}
                    >
                      {canAfford ? 'Comprar' : 'Insuficiente'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="no-items">
          <p>No hay items disponibles en esta categoría.</p>
        </div>
      )}
    </div>
  );
}

