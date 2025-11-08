import { useEffect, useState } from 'react';

/**
 * Componente para alternar entre modo oscuro y claro
 * 
 * Guarda la preferencia en localStorage y aplica la clase 'dark'
 * al elemento <html> para que funcione con CSS dark mode.
 */
export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    // Leer preferencia guardada o usar preferencia del sistema
    try {
      const saved = localStorage.getItem('finast-theme');
      if (saved) {
        return saved === 'dark';
      }
      // Si no hay preferencia guardada, usar preferencia del sistema
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (error) {
      return false;
    }
  });

  useEffect(() => {
    // Aplicar tema al elemento <html>
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
      localStorage.setItem('finast-theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('finast-theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  return (
    <button 
      className="theme-toggle" 
      onClick={toggleTheme}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={isDark ? "Modo oscuro" : "Modo claro"}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}

