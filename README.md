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
  │   └── levels.js          # Datos de niveles, lecciones y preguntas
  ├── components/
  │   ├── Navbar.jsx         # Barra de navegación
  │   ├── LevelCard.jsx      # Tarjeta de nivel
  │   ├── QuestionCard.jsx   # Componente de pregunta
  │   ├── LessonView.jsx     # Vista completa de lección
  │   ├── ProgressPanel.jsx  # Panel de progreso
  │   └── BadgeList.jsx      # Lista de insignias
  ├── pages/
  │   ├── Home.jsx           # Página de inicio
  │   ├── Levels.jsx         # Lista de niveles
  │   ├── Lesson.jsx         # Página de lección
  │   └── Progress.jsx       # Página de progreso
  ├── utils/
  │   ├── storage.js         # Funciones de localStorage
  │   └── progress.js        # Funciones de cálculo de progreso
  ├── App.jsx                # Componente principal con rutas
  ├── App.css                # Estilos globales
  └── main.jsx               # Punto de entrada
```

## 🎯 Características

- ✅ Sistema de niveles con desbloqueo progresivo
- ✅ Lecciones interactivas con preguntas de opción múltiple y verdadero/falso
- ✅ Feedback inmediato con explicaciones
- ✅ Sistema de puntos y racha diaria
- ✅ Insignias por logros
- ✅ Progreso guardado en localStorage
- ✅ Diseño responsive y moderno

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

Todos los datos del usuario (progreso, puntos, racha, lecciones completadas) se guardan en `localStorage` del navegador. No se requiere backend ni base de datos.

## 🎨 Personalización

Los estilos están en `src/App.css`. Puedes modificar colores, fuentes y diseño según tus preferencias.

---

¡Disfruta aprendiendo sobre finanzas con Finast! 💰📚
