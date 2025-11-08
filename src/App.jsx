import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Levels from './pages/Levels.jsx';
import Lesson from './pages/Lesson.jsx';
import Progress from './pages/Progress.jsx';
import Profile from './pages/Profile.jsx';
import Community from './pages/Community.jsx';
import Resources from './pages/Resources.jsx';
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
    
    // Aplicar tema guardado al cargar
    try {
      const savedTheme = localStorage.getItem('finast-theme');
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (error) {
      // Ignorar errores
    }
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
            <Route path="/profile" element={<Profile />} />
            <Route path="/community" element={<Community />} />
            <Route path="/resources" element={<Resources />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

