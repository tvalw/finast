/**
 * Sistema de traducciones simple (i18n)
 * 
 * Este archivo contiene todas las traducciones de la aplicación
 * en español e inglés. Se usa un hook useTranslation() para acceder a ellas.
 */

export const translations = {
  es: {
    // Navegación
    nav: {
      home: "Inicio",
      levels: "Niveles",
      progress: "Progreso",
      profile: "Perfil",
      community: "Comunidad",
    },
    // Página de inicio
    home: {
      title: "Bienvenido a Finast",
      subtitle: "Aprende educación financiera de forma divertida",
      startLearning: "Comenzar a aprender",
      viewProgress: "Ver mi progreso",
    },
    // Perfil
    profile: {
      title: "Mi Perfil",
      name: "Nombre",
      goal: "Meta financiera",
      joined: "Se unió el",
      currentStreak: "Racha actual",
      points: "Puntos",
      level: "Nivel",
      badges: "Insignias obtenidas",
      resetProgress: "Reiniciar progreso",
      resetConfirm: "¿Estás seguro? Esto borrará todo tu progreso.",
      changeAvatar: "Cambiar avatar",
      editName: "Editar nombre",
      editGoal: "Editar meta",
    },
    // Comunidad
    community: {
      title: "Comunidad Finast",
      subtitle: "Comparte tu progreso y aprende con otros",
      writePost: "Escribe un post...",
      post: "Publicar",
      likes: "me gusta",
      like: "Me gusta",
      noPosts: "Aún no hay publicaciones. ¡Sé el primero en compartir!",
    },
    // Progreso
    progress: {
      title: "Mi Progreso",
      points: "Puntos",
      streak: "Racha (días)",
      levelReached: "Nivel alcanzado",
      currentLevel: "Nivel actual",
      completedLessons: "Lecciones completadas",
    },
    // Lecciones
    lesson: {
      completed: "¡Lección Completada!",
      pointsEarned: "Has ganado {points} puntos",
      nextLesson: "Siguiente lección",
      backToLevels: "Volver a niveles",
      continueLearning: "Seguir aprendiendo",
    },
    // Niveles
    levels: {
      title: "Niveles",
      locked: "Bloqueado",
      available: "Disponible",
      completed: "Completado",
    },
    // Badges
    badges: {
      title: "Insignias Desbloqueadas",
      noBadges: "¡Completa lecciones para ganar insignias! 🏆",
    },
    // Celebración
    celebration: {
      congratulations: "¡Felicidades!",
      lessonCompleted: "Lección completada",
      pointsEarned: "Puntos ganados",
      badgeUnlocked: "Insignia desbloqueada",
      continue: "Seguir aprendiendo",
    },
    // Niveles de usuario
    userLevel: {
      novice: "Novato 💡",
      intermediate: "Intermedio 💪",
      expert: "Experto 💰",
    },
  },
  en: {
    // Navigation
    nav: {
      home: "Home",
      levels: "Levels",
      progress: "Progress",
      profile: "Profile",
      community: "Community",
    },
    // Home page
    home: {
      title: "Welcome to Finast",
      subtitle: "Learn financial education in a fun way",
      startLearning: "Start learning",
      viewProgress: "View my progress",
    },
    // Profile
    profile: {
      title: "My Profile",
      name: "Name",
      goal: "Financial goal",
      joined: "Joined on",
      currentStreak: "Current streak",
      points: "Points",
      level: "Level",
      badges: "Badges earned",
      resetProgress: "Reset progress",
      resetConfirm: "Are you sure? This will delete all your progress.",
      changeAvatar: "Change avatar",
      editName: "Edit name",
      editGoal: "Edit goal",
    },
    // Community
    community: {
      title: "Finast Community",
      subtitle: "Share your progress and learn with others",
      writePost: "Write a post...",
      post: "Post",
      likes: "likes",
      like: "Like",
      noPosts: "No posts yet. Be the first to share!",
    },
    // Progress
    progress: {
      title: "My Progress",
      points: "Points",
      streak: "Streak (days)",
      levelReached: "Level reached",
      currentLevel: "Current level",
      completedLessons: "Completed lessons",
    },
    // Lessons
    lesson: {
      completed: "Lesson Completed!",
      pointsEarned: "You earned {points} points",
      nextLesson: "Next lesson",
      backToLevels: "Back to levels",
      continueLearning: "Continue learning",
    },
    // Levels
    levels: {
      title: "Levels",
      locked: "Locked",
      available: "Available",
      completed: "Completed",
    },
    // Badges
    badges: {
      title: "Unlocked Badges",
      noBadges: "Complete lessons to earn badges! 🏆",
    },
    // Celebration
    celebration: {
      congratulations: "Congratulations!",
      lessonCompleted: "Lesson completed",
      pointsEarned: "Points earned",
      badgeUnlocked: "Badge unlocked",
      continue: "Continue learning",
    },
    // User levels
    userLevel: {
      novice: "Novice 💡",
      intermediate: "Intermediate 💪",
      expert: "Expert 💰",
    },
  },
};

/**
 * Obtiene el idioma actual desde localStorage
 * Por defecto devuelve 'es' (español)
 */
export function getLanguage() {
  try {
    const lang = localStorage.getItem("finast-language");
    return lang || "es";
  } catch (error) {
    console.error("Error al leer el idioma:", error);
    return "es";
  }
}

/**
 * Guarda el idioma seleccionado en localStorage
 */
export function setLanguage(lang) {
  try {
    localStorage.setItem("finast-language", lang);
    // Disparar evento para actualizar la UI
    window.dispatchEvent(new CustomEvent("finast:languageChanged"));
  } catch (error) {
    console.error("Error al guardar el idioma:", error);
  }
}

/**
 * Hook simple para usar traducciones
 * Nota: En un proyecto real, esto sería un hook de React
 * Por ahora, es una función que se puede usar en componentes
 */
export function getTranslation(key, lang = null) {
  const currentLang = lang || getLanguage();
  const keys = key.split(".");
  let value = translations[currentLang];
  
  for (const k of keys) {
    if (value && typeof value === "object") {
      value = value[k];
    } else {
      return key; // Si no encuentra la traducción, devuelve la clave
    }
  }
  
  return value || key;
}

