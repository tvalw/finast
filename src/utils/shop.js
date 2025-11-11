/**
 * Utilidades para la tienda de puntos
 * Maneja compras, inventario y aplicación de personalizaciones
 */

import { getItemById } from '../data/shopItems.js';

const PURCHASED_ITEMS_KEY = 'finast-purchased-items';
const ACTIVE_THEME_KEY = 'finast-active-theme';
const ACTIVE_AVATAR_KEY = 'finast-active-avatar';
const ACTIVE_EFFECTS_KEY = 'finast-active-effects';
const ACTIVE_NAVBAR_EFFECTS_KEY = 'finast-active-navbar-effects';
const ACTIVE_BACKGROUND_EFFECTS_KEY = 'finast-active-background-effects';

/**
 * Obtiene todos los items comprados
 */
export function getPurchasedItems() {
  try {
    const stored = localStorage.getItem(PURCHASED_ITEMS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error al leer items comprados:', error);
    return [];
  }
}

/**
 * Verifica si un item está comprado
 */
export function isItemPurchased(itemId) {
  const purchased = getPurchasedItems();
  return purchased.includes(itemId);
}

/**
 * Compra un item
 */
export function purchaseItem(itemId) {
  const purchased = getPurchasedItems();
  if (!purchased.includes(itemId)) {
    purchased.push(itemId);
    try {
      localStorage.setItem(PURCHASED_ITEMS_KEY, JSON.stringify(purchased));
      return true;
    } catch (error) {
      console.error('Error al guardar compra:', error);
      return false;
    }
  }
  return false;
}

/**
 * Obtiene el tema activo
 */
export function getActiveTheme() {
  try {
    return localStorage.getItem(ACTIVE_THEME_KEY) || null;
  } catch (error) {
    console.error('Error al leer tema activo:', error);
    return null;
  }
}

/**
 * Activa un tema
 */
export function setActiveTheme(themeId) {
  try {
    if (themeId) {
      localStorage.setItem(ACTIVE_THEME_KEY, themeId);
      applyTheme(themeId);
    } else {
      localStorage.removeItem(ACTIVE_THEME_KEY);
      removeTheme();
    }
  } catch (error) {
    console.error('Error al activar tema:', error);
  }
}

/**
 * Aplica un tema a la página
 */
export function applyTheme(themeId) {
  if (!themeId || typeof window === 'undefined') return;
  
  const theme = getItemById(themeId);
  
  if (!theme || theme.type !== 'theme') {
    console.warn('Tema no encontrado:', themeId);
    return;
  }

  const root = document.documentElement;
  
  // Aplicar colores principales
  root.style.setProperty('--theme-primary', theme.preview.primary);
  root.style.setProperty('--theme-secondary', theme.preview.secondary);
  root.style.setProperty('--theme-accent', theme.preview.accent);
  
  // Calcular colores derivados
  const primaryRgb = hexToRgb(theme.preview.primary);
  const secondaryRgb = hexToRgb(theme.preview.secondary);
  
  if (primaryRgb) {
    root.style.setProperty('--theme-primary-light', `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.1)`);
    root.style.setProperty('--theme-primary-hover', darkenColor(theme.preview.primary, 0.15));
  }
  
  if (secondaryRgb) {
    root.style.setProperty('--theme-secondary-hover', darkenColor(theme.preview.secondary, 0.15));
  }
  
  // Remover otros temas
  root.className = root.className.replace(/theme-\w+/g, '').trim();
  root.classList.add(`theme-${themeId}`);
  
  // Disparar evento para actualizar UI
  window.dispatchEvent(new CustomEvent('finast:themeChanged'));
}

/**
 * Convierte un color hex a RGB
 */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Oscurece un color hex
 */
function darkenColor(hex, amount) {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  
  const r = Math.max(0, Math.floor(rgb.r * (1 - amount)));
  const g = Math.max(0, Math.floor(rgb.g * (1 - amount)));
  const b = Math.max(0, Math.floor(rgb.b * (1 - amount)));
  
  return `#${[r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('')}`;
}

/**
 * Remueve el tema activo
 */
export function removeTheme() {
  const root = document.documentElement;
  root.style.removeProperty('--theme-primary');
  root.style.removeProperty('--theme-secondary');
  root.style.removeProperty('--theme-accent');
  root.className = root.className.replace(/theme-\w+/g, '').trim();
  
  // Disparar evento para actualizar UI
  window.dispatchEvent(new CustomEvent('finast:themeChanged'));
}

/**
 * Obtiene el avatar activo
 */
export function getActiveAvatar() {
  try {
    return localStorage.getItem(ACTIVE_AVATAR_KEY) || null;
  } catch (error) {
    console.error('Error al leer avatar activo:', error);
    return null;
  }
}

/**
 * Activa un avatar
 */
export function setActiveAvatar(avatarId) {
  try {
    if (avatarId) {
      localStorage.setItem(ACTIVE_AVATAR_KEY, avatarId);
    } else {
      localStorage.removeItem(ACTIVE_AVATAR_KEY);
    }
    // Disparar evento para actualizar UI
    window.dispatchEvent(new CustomEvent('finast:avatarChanged'));
  } catch (error) {
    console.error('Error al activar avatar:', error);
  }
}

/**
 * Obtiene los efectos activos
 */
export function getActiveEffects() {
  try {
    const stored = localStorage.getItem(ACTIVE_EFFECTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error al leer efectos activos:', error);
    return [];
  }
}

/**
 * Activa o desactiva un efecto
 */
export function toggleEffect(effectId) {
  const active = getActiveEffects();
  const index = active.indexOf(effectId);
  
  if (index > -1) {
    active.splice(index, 1);
  } else {
    active.push(effectId);
  }
  
  try {
    localStorage.setItem(ACTIVE_EFFECTS_KEY, JSON.stringify(active));
    applyEffects(active);
    return true;
  } catch (error) {
    console.error('Error al guardar efectos:', error);
    return false;
  }
}

/**
 * Aplica efectos visuales
 */
export function applyEffects(effectIds) {
  const root = document.documentElement;
  
  // Remover todos los efectos
  root.className = root.className.replace(/effect-\w+/g, '').trim();
  
  // Aplicar efectos activos
  effectIds.forEach(effectId => {
    root.classList.add(`effect-${effectId}`);
  });
}

/**
 * Obtiene los efectos de navbar activos
 */
export function getActiveNavbarEffects() {
  try {
    const stored = localStorage.getItem(ACTIVE_NAVBAR_EFFECTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error al leer efectos de navbar activos:', error);
    return [];
  }
}

/**
 * Activa o desactiva un efecto de navbar
 */
export function toggleNavbarEffect(effectId) {
  const active = getActiveNavbarEffects();
  const index = active.indexOf(effectId);
  
  if (index > -1) {
    active.splice(index, 1);
  } else {
    active.push(effectId);
  }
  
  try {
    localStorage.setItem(ACTIVE_NAVBAR_EFFECTS_KEY, JSON.stringify(active));
    applyNavbarEffects(active);
    return true;
  } catch (error) {
    console.error('Error al guardar efectos de navbar:', error);
    return false;
  }
}

/**
 * Aplica efectos visuales a la navbar
 */
export function applyNavbarEffects(effectIds) {
  const root = document.documentElement;
  
  // Remover todos los efectos de navbar
  root.className = root.className.replace(/navbar-effect-\w+/g, '').trim();
  
  // Aplicar efectos activos
  effectIds.forEach(effectId => {
    root.classList.add(`navbar-effect-${effectId}`);
  });
}

/**
 * Obtiene los efectos de fondo activos
 */
export function getActiveBackgroundEffects() {
  try {
    const stored = localStorage.getItem(ACTIVE_BACKGROUND_EFFECTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error al leer efectos de fondo activos:', error);
    return [];
  }
}

/**
 * Activa o desactiva un efecto de fondo
 */
export function toggleBackgroundEffect(effectId) {
  const active = getActiveBackgroundEffects();
  const index = active.indexOf(effectId);
  
  if (index > -1) {
    active.splice(index, 1);
  } else {
    active.push(effectId);
  }
  
  try {
    localStorage.setItem(ACTIVE_BACKGROUND_EFFECTS_KEY, JSON.stringify(active));
    applyBackgroundEffects(active);
    return true;
  } catch (error) {
    console.error('Error al guardar efectos de fondo:', error);
    return false;
  }
}

/**
 * Aplica efectos visuales al fondo
 */
export function applyBackgroundEffects(effectIds) {
  const root = document.documentElement;
  
  // Remover todos los efectos de fondo
  root.className = root.className.replace(/bg-effect-\w+/g, '').trim();
  
  // Aplicar efectos activos
  effectIds.forEach(effectId => {
    root.classList.add(`bg-effect-${effectId}`);
  });
}

// Aplicar tema y efectos al cargar
if (typeof window !== 'undefined') {
  const initializeShop = () => {
    const activeTheme = getActiveTheme();
    if (activeTheme) {
      applyTheme(activeTheme);
    }
    
    const activeEffects = getActiveEffects();
    applyEffects(activeEffects);
    
    const activeNavbarEffects = getActiveNavbarEffects();
    applyNavbarEffects(activeNavbarEffects);
    
    const activeBackgroundEffects = getActiveBackgroundEffects();
    applyBackgroundEffects(activeBackgroundEffects);
  };
  
  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', initializeShop);
  } else {
    initializeShop();
  }
}

