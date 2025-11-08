# Finast 💰

Aplicación web de educación financiera tipo Duolingo, construida con React + Vite.

## 🚀 Inicio Rápido

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

3. **Abrir en el navegador:**
   La aplicación estará disponible en `http://localhost:5173`

## 📁 Estructura del Proyecto

```
src/
  ├── data/
  │   ├── levels.js          # Datos de niveles, lecciones y preguntas
  │   ├── user.js            # Datos del usuario y funciones de perfil
  │   └── translations.js    # Sistema de traducciones (i18n)
  ├── components/
  │   ├── Navbar.jsx         # Barra de navegación con controles
  │   ├── LevelCard.jsx      # Tarjeta de nivel
  │   ├── QuestionCard.jsx   # Componente de pregunta con sonidos
  │   ├── LessonView.jsx     # Vista completa de lección
  │   ├── ProgressPanel.jsx  # Panel de progreso mejorado
  │   ├── BadgeList.jsx      # Lista de insignias
  │   ├── CelebrationModal.jsx # Modal de celebración al completar lección
  │   └── ThemeToggle.jsx    # Toggle de modo oscuro/claro
  ├── pages/
  │   ├── Home.jsx           # Página de inicio
  │   ├── Levels.jsx         # Lista de niveles
  │   ├── Lesson.jsx         # Página de lección
  │   ├── Progress.jsx       # Página de progreso
  │   ├── Profile.jsx        # Página de perfil del usuario
  │   └── Community.jsx      # Página de comunidad simulada
  ├── hooks/
  │   └── useProgress.js     # Hook personalizado para manejar progreso
  ├── utils/
  │   ├── storage.js         # Funciones de localStorage mejoradas
  │   ├── progress.js        # Funciones de cálculo de progreso
  │   └── debug.js           # Utilidades de depuración y testing
  ├── App.jsx                # Componente principal con rutas
  ├── App.css                # Estilos globales con modo oscuro
  └── main.jsx               # Punto de entrada
```

## 🎯 Características

### Funcionalidades Base
- ✅ Sistema de niveles con desbloqueo progresivo
- ✅ Lecciones interactivas con preguntas de opción múltiple y verdadero/falso
- ✅ Feedback inmediato con explicaciones
- ✅ Sistema de puntos y racha diaria
- ✅ Insignias por logros
- ✅ Progreso guardado en localStorage
- ✅ Diseño responsive y moderno

### Nuevas Funcionalidades Extendidas
- ✅ **Perfil de usuario** con avatar editable, nombre y meta financiera personalizable
- ✅ **Sistema de recompensas visuales** con modal de celebración animado al completar lecciones
- ✅ **Comunidad simulada** con posts educativos y sistema de "me gusta"
- ✅ **Barra de progreso visual** que muestra el porcentaje de lecciones completadas
- ✅ **Niveles dinámicos** (Novato, Intermedio, Experto) basados en puntos
- ✅ **Sonidos de retroalimentación** al responder preguntas (correcto/error)
- ✅ **Modo oscuro/claro** con toggle en la navbar
- ✅ **Internacionalización (i18n)** con soporte para español e inglés
- ✅ **Modo desarrollador** activable con doble clic en el logo
- ✅ **Utilidades de debug** para testing y demostraciones

## 📝 Agregar o Modificar Contenido

Para agregar nuevos niveles, lecciones o preguntas, edita el archivo `src/data/levels.js`.

### Estructura de un nivel:
```javascript
{
  id: 1,
  title: "Nivel 1: Ahorro básico",
  description: "Descripción del nivel",
  lessons: [
    {
      id: "1-1",
      title: "Título de la lección",
      questions: [
        {
          id: "q1",
          type: "multiple", // o "truefalse"
          question: "¿Pregunta?",
          options: ["Opción 1", "Opción 2", ...], // Solo para múltiple
          correctOptionIndex: 1, // Solo para múltiple
          answer: true, // Solo para verdadero/falso
          explanation: "Explicación de la respuesta"
        }
      ]
    }
  ]
}
```

## 🛠️ Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción

## 📦 Tecnologías Utilizadas

- React 18
- Vite
- React Router DOM
- CSS3 (sin frameworks adicionales)

## 💾 Almacenamiento

Todos los datos del usuario (progreso, puntos, racha, lecciones completadas, perfil, tema, idioma) se guardan en `localStorage` del navegador. No se requiere backend ni base de datos.

## 🎨 Personalización

Los estilos están en `src/App.css`. Puedes modificar colores, fuentes y diseño según tus preferencias.

### Colores principales
- Verde principal: `#00b894`
- Amarillo XP: `#fdcb6e`
- Azul acento: `#0984e3`
- Fondo claro: `#f9fafb`

## 🔊 Sonidos

La aplicación está preparada para usar sonidos de retroalimentación. Para agregarlos:

1. Crea la carpeta `public/assets/sounds/` en la raíz del proyecto
2. Agrega los archivos:
   - `correct.mp3` - Sonido para respuesta correcta
   - `error.mp3` - Sonido para respuesta incorrecta
3. Los sonidos se reproducirán automáticamente al responder preguntas

**Nota:** Si los archivos no existen, la aplicación funcionará normalmente sin sonidos.

## 🛠️ Modo Desarrollador

Para activar el modo desarrollador:
1. Haz doble clic en el logo "💰 Finast" en la navbar
2. Se activará automáticamente y verás un mensaje en la consola
3. Accede a las funciones de debug con `window.finastDebug`:
   - `window.finastDebug.resetProgress()` - Resetea todo el progreso
   - `window.finastDebug.completeLevel(1)` - Completa un nivel específico
   - `window.finastDebug.completeAllLevels()` - Completa todos los niveles
   - `window.finastDebug.fillDemoData()` - Llena datos de demostración
   - `window.finastDebug.getDebugInfo()` - Muestra información de debug

## 🌍 Internacionalización

La aplicación soporta español e inglés. Para cambiar el idioma:
- Usa los botones 🇪🇸 / 🇬🇧 en la navbar
- La preferencia se guarda automáticamente

Para agregar más idiomas, edita `src/data/translations.js`.

## 🎭 Modo Oscuro

Activa/desactiva el modo oscuro con el botón 🌙/☀️ en la navbar. La preferencia se guarda automáticamente.

## 📱 Responsive

La aplicación está completamente optimizada para dispositivos móviles. En pantallas pequeñas:
- Los botones ocupan el 100% del ancho
- La navbar se reorganiza verticalmente
- Los componentes se adaptan automáticamente

---

¡Disfruta aprendiendo sobre finanzas con Finast! 💰📚
