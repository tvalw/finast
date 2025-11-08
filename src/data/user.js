/**
 * Datos simulados del usuario actual
 * 
 * Este archivo contiene la información del perfil del usuario.
 * En una aplicación real, estos datos vendrían de un backend o servicio de autenticación.
 */

export const user = {
  name: "Vale",
  avatar: "/assets/avatar1.png", // Por defecto, se puede cambiar
  goal: "Aprender a ahorrar e invertir",
  joinedAt: "2025-10-01",
};

/**
 * Obtiene el usuario desde localStorage o devuelve el usuario por defecto
 */
export function getUser() {
  try {
    const stored = localStorage.getItem("finast-user");
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error al leer el usuario:", error);
  }
  
  // Si no hay usuario guardado, usar el por defecto y guardarlo
  saveUser(user);
  return user;
}

/**
 * Guarda el usuario en localStorage
 */
export function saveUser(userData) {
  try {
    localStorage.setItem("finast-user", JSON.stringify(userData));
  } catch (error) {
    console.error("Error al guardar el usuario:", error);
  }
}

/**
 * Actualiza el nombre del usuario
 */
export function updateUserName(name) {
  const userData = getUser();
  userData.name = name;
  saveUser(userData);
  return userData;
}

/**
 * Actualiza el avatar del usuario
 */
export function updateUserAvatar(avatar) {
  const userData = getUser();
  userData.avatar = avatar;
  saveUser(userData);
  return userData;
}

/**
 * Actualiza la meta financiera del usuario
 */
export function updateUserGoal(goal) {
  const userData = getUser();
  userData.goal = goal;
  saveUser(userData);
  return userData;
}

