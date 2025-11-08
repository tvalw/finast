import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Levels from './pages/Levels.jsx';
import Lesson from './pages/Lesson.jsx';
import Progress from './pages/Progress.jsx';
import { updateStreak } from './utils/storage.js';
import './App.css';

/**
 * Componente principal de la aplicación
 * Configura las rutas y actualiza la racha al cargar
 */
function App() {
  // Actualizar la racha cada vez que se carga la app
  useEffect(() => {
    updateStreak();
  }, []);

  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/levels" element={<Levels />} />
            <Route path="/lesson/:levelId/:lessonId" element={<Lesson />} />
            <Route path="/progress" element={<Progress />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

