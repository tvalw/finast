/**
 * Items disponibles en la tienda
 * Cada item tiene un tipo, precio, y efectos visuales
 */

export const shopItems = [
  // Temas de color
  {
    id: 'theme-ocean',
    name: 'Tema Océano',
    description: 'Colores azules y turquesas para una experiencia relajante',
    price: 100,
    type: 'theme',
    category: 'temas',
    icon: '🌊',
    preview: {
      primary: '#0ea5e9',
      secondary: '#06b6d4',
      accent: '#14b8a6'
    }
  },
  {
    id: 'theme-sunset',
    name: 'Tema Atardecer',
    description: 'Tonos cálidos naranjas y rosas',
    price: 150,
    type: 'theme',
    category: 'temas',
    icon: '🌅',
    preview: {
      primary: '#f97316',
      secondary: '#fb923c',
      accent: '#f87171'
    }
  },
  {
    id: 'theme-forest',
    name: 'Tema Bosque',
    description: 'Verdes naturales y tierra',
    price: 120,
    type: 'theme',
    category: 'temas',
    icon: '🌲',
    preview: {
      primary: '#22c55e',
      secondary: '#16a34a',
      accent: '#84cc16'
    }
  },
  {
    id: 'theme-purple',
    name: 'Tema Púrpura',
    description: 'Violetas y morados vibrantes',
    price: 130,
    type: 'theme',
    category: 'temas',
    icon: '💜',
    preview: {
      primary: '#a855f7',
      secondary: '#9333ea',
      accent: '#c084fc'
    }
  },
  
  // Avatares especiales
  {
    id: 'avatar-crown',
    name: 'Avatar Corona',
    description: 'Avatar exclusivo con corona dorada',
    price: 200,
    type: 'avatar',
    category: 'avatares',
    icon: '👑',
    value: '👑'
  },
  {
    id: 'avatar-robot',
    name: 'Avatar Robot',
    description: 'Avatar futurista de robot',
    price: 180,
    type: 'avatar',
    category: 'avatares',
    icon: '🤖',
    value: '🤖'
  },
  {
    id: 'avatar-alien',
    name: 'Avatar Alien',
    description: 'Avatar extraterrestre único',
    price: 250,
    type: 'avatar',
    category: 'avatares',
    icon: '👽',
    value: '👽'
  },
  
  // Efectos visuales
  {
    id: 'effect-sparkles',
    name: 'Efecto Destellos',
    description: 'Añade destellos animados a los botones',
    price: 80,
    type: 'effect',
    category: 'efectos',
    icon: '✨',
    value: 'sparkles'
  },
  {
    id: 'effect-gradient',
    name: 'Gradientes Mejorados',
    description: 'Gradientes más vibrantes en toda la app',
    price: 100,
    type: 'effect',
    category: 'efectos',
    icon: '🌈',
    value: 'gradient'
  },
  
  // Personalización de navbar
  {
    id: 'navbar-glow',
    name: 'Navbar Brillante',
    description: 'Efecto de brillo en la barra de navegación',
    price: 90,
    type: 'navbar',
    category: 'personalizacion',
    icon: '💫',
    value: 'glow'
  },
  
  // Fondos especiales
  {
    id: 'bg-pattern',
    name: 'Patrón de Fondo',
    description: 'Patrón sutil en el fondo de la página',
    price: 70,
    type: 'background',
    category: 'fondos',
    icon: '🎨',
    value: 'pattern'
  }
];

/**
 * Obtiene todos los items de una categoría
 */
export function getItemsByCategory(category) {
  return shopItems.filter(item => item.category === category);
}

/**
 * Obtiene todas las categorías disponibles
 */
export function getCategories() {
  const categories = [...new Set(shopItems.map(item => item.category))];
  return categories;
}

/**
 * Obtiene el nombre de la categoría en español
 */
export function getCategoryName(category) {
  const names = {
    'temas': 'Temas',
    'avatares': 'Avatares',
    'efectos': 'Efectos',
    'personalizacion': 'Personalización',
    'fondos': 'Fondos'
  };
  return names[category] || category;
}

/**
 * Obtiene un item por su ID
 */
export function getItemById(id) {
  return shopItems.find(item => item.id === id);
}

