import { useState, useEffect } from 'react';
import { getUser } from '../data/user.js';

/**
 * Página de comunidad mejorada
 * 
 * Incluye:
 * - Widget de encuesta semanal
 * - Pestañas de filtrado (TODO, LOGROS, PREGUNTAS)
 * - Feed social interactivo
 */
export default function Community() {
  
  // Posts iniciales simulados con tipo
  const [posts, setPosts] = useState([
    { 
      id: 1, 
      user: "Sofi", 
      text: "Hoy completé el nivel de presupuesto 🎯", 
      likes: 3,
      liked: false,
      type: 'achievement' // logro
    },
    { 
      id: 2, 
      user: "Leo", 
      text: "Aprendí a diferenciar gastos fijos y variables 💡", 
      likes: 5,
      liked: false,
      type: 'achievement' // logro
    },
    { 
      id: 3, 
      user: "Ana", 
      text: "Mi racha de 7 días sigue creciendo! 🔥", 
      likes: 8,
      liked: false,
      type: 'achievement' // logro
    },
    { 
      id: 4, 
      user: "Carlos", 
      text: "Finalmente entendí cómo funciona un fondo de emergencia 💰", 
      likes: 12,
      liked: false,
      type: 'achievement' // logro
    },
    { 
      id: 5, 
      user: "María", 
      text: "¿Alguien sabe cómo calcular cuánto debería tener en mi fondo de emergencia? 🤔", 
      likes: 4,
      liked: false,
      type: 'question' // pregunta
    },
    { 
      id: 6, 
      user: "Pedro", 
      text: "¿Es mejor pagar primero las deudas pequeñas o las grandes? Necesito ayuda 😅", 
      likes: 6,
      liked: false,
      type: 'question' // pregunta
    },
  ]);

  const [newPostText, setNewPostText] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'achievement', 'question'
  
  // Encuesta semanal
  const [pollVote, setPollVote] = useState(null); // null, 'option1', 'option2', 'option3'
  const [pollResults, setPollResults] = useState({
    option1: 45, // Evitar gastos hormiga
    option2: 30, // Pagar tarjeta de crédito
    option3: 25  // Ahorrar para meta grande
  });
  const [showPollResults, setShowPollResults] = useState(false);

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const wasLiked = post.liked;
        return {
          ...post,
          liked: !wasLiked,
          likes: wasLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handlePost = () => {
    if (newPostText.trim()) {
      const user = getUser();
      // Detectar automáticamente el tipo de post
      const text = newPostText.trim();
      const isQuestion = text.includes('?') || 
                        text.toLowerCase().includes('pregunta') ||
                        text.toLowerCase().includes('ayuda') ||
                        text.toLowerCase().includes('cómo') ||
                        text.toLowerCase().includes('cuál') ||
                        text.toLowerCase().includes('qué');
      
      const newPost = {
        id: Date.now(),
        user: user.name || "Usuario",
        text: text,
        likes: 0,
        liked: false,
        type: isQuestion ? 'question' : 'achievement'
      };
      setPosts([newPost, ...posts]);
      setNewPostText('');
    }
  };

  const handlePollVote = (option) => {
    if (!pollVote) {
      setPollVote(option);
      // Actualizar resultados (simulado)
      setPollResults(prev => {
        const newResults = { ...prev };
        newResults[option] = (newResults[option] || 0) + 1;
        // Recalcular porcentajes
        const total = Object.values(newResults).reduce((sum, val) => sum + val, 0);
        Object.keys(newResults).forEach(key => {
          newResults[key] = Math.round((newResults[key] / total) * 100);
        });
        return newResults;
      });
      setShowPollResults(true);
      
      // Guardar voto en localStorage
      const weekKey = `finast-poll-${getCurrentWeek()}`;
      localStorage.setItem(weekKey, option);
    }
  };

  const getCurrentWeek = () => {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const days = Math.floor((now - startOfYear) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + startOfYear.getDay() + 1) / 7);
  };

  // Cargar voto guardado al montar
  useEffect(() => {
    const weekKey = `finast-poll-${getCurrentWeek()}`;
    const savedVote = localStorage.getItem(weekKey);
    if (savedVote) {
      setPollVote(savedVote);
      setShowPollResults(true);
    }
  }, []);

  // Filtrar posts según la pestaña activa
  const filteredPosts = activeTab === 'all' 
    ? posts 
    : posts.filter(post => post.type === activeTab);

  return (
    <div className="page community-page">
      <h1>Comunidad Finast</h1>
      <p className="page-description">Comparte tu progreso y aprende con otros</p>

      {/* Widget de Encuesta Semanal */}
      <div className="poll-widget">
        <div className="poll-header">
          <span className="poll-icon">🗳️</span>
          <h3>Encuesta de la Semana</h3>
        </div>
        <p className="poll-question">¡Hola, equipo! Esta semana, ¿cuál es su mayor desafío?</p>
        
        {!showPollResults ? (
          <div className="poll-options">
            <button
              className={`poll-option ${pollVote === 'option1' ? 'selected' : ''}`}
              onClick={() => handlePollVote('option1')}
              disabled={!!pollVote}
            >
              <input type="radio" checked={pollVote === 'option1'} readOnly />
              <span>Evitar gastos hormiga (café, snacks)</span>
            </button>
            <button
              className={`poll-option ${pollVote === 'option2' ? 'selected' : ''}`}
              onClick={() => handlePollVote('option2')}
              disabled={!!pollVote}
            >
              <input type="radio" checked={pollVote === 'option2'} readOnly />
              <span>Pagar una tarjeta de crédito</span>
            </button>
            <button
              className={`poll-option ${pollVote === 'option3' ? 'selected' : ''}`}
              onClick={() => handlePollVote('option3')}
              disabled={!!pollVote}
            >
              <input type="radio" checked={pollVote === 'option3'} readOnly />
              <span>Ahorrar para una meta grande</span>
            </button>
          </div>
        ) : (
          <div className="poll-results">
            <div className="poll-result-item">
              <div className="poll-result-label">
                <span>Evitar gastos hormiga</span>
                <span className="poll-percentage">{pollResults.option1}%</span>
              </div>
              <div className="poll-result-bar">
                <div 
                  className="poll-result-fill" 
                  style={{ width: `${pollResults.option1}%` }}
                ></div>
              </div>
            </div>
            <div className="poll-result-item">
              <div className="poll-result-label">
                <span>Pagar tarjeta de crédito</span>
                <span className="poll-percentage">{pollResults.option2}%</span>
              </div>
              <div className="poll-result-bar">
                <div 
                  className="poll-result-fill" 
                  style={{ width: `${pollResults.option2}%` }}
                ></div>
              </div>
            </div>
            <div className="poll-result-item">
              <div className="poll-result-label">
                <span>Ahorrar para meta grande</span>
                <span className="poll-percentage">{pollResults.option3}%</span>
              </div>
              <div className="poll-result-bar">
                <div 
                  className="poll-result-fill" 
                  style={{ width: `${pollResults.option3}%` }}
                ></div>
              </div>
            </div>
            <p className="poll-results-note">¡Gracias por participar! No estás solo en tus desafíos 💪</p>
          </div>
        )}
      </div>

      {/* Formulario para nuevo post */}
      <div className="community-post-form">
        <textarea
          className="post-input"
          placeholder="Escribe un post..."
          value={newPostText}
          onChange={(e) => setNewPostText(e.target.value)}
          rows="3"
        />
        <button 
          className="btn btn-primary"
          onClick={handlePost}
          disabled={!newPostText.trim()}
        >
          Publicar
        </button>
      </div>

      {/* Pestañas de filtrado */}
      <div className="community-tabs">
        <button
          className={`community-tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          TODO
        </button>
        <button
          className={`community-tab ${activeTab === 'achievement' ? 'active' : ''}`}
          onClick={() => setActiveTab('achievement')}
        >
          🏆 LOGROS
        </button>
        <button
          className={`community-tab ${activeTab === 'question' ? 'active' : ''}`}
          onClick={() => setActiveTab('question')}
        >
          ❓ PREGUNTAS
        </button>
      </div>

      {/* Lista de posts filtrados */}
      <div className="community-posts">
        {filteredPosts.length === 0 ? (
          <p className="no-posts">
            {activeTab === 'all' 
              ? 'Aún no hay publicaciones. ¡Sé el primero en compartir!'
              : activeTab === 'achievement'
              ? 'No hay logros compartidos aún. ¡Comparte el tuyo!'
              : 'No hay preguntas aún. ¡Sé el primero en preguntar!'
            }
          </p>
        ) : (
          filteredPosts.map(post => (
            <div key={post.id} className={`community-post ${post.type === 'question' ? 'post-question' : 'post-achievement'}`}>
              <div className="post-header">
                <div className="post-avatar">
                  {post.user.charAt(0).toUpperCase()}
                </div>
                <div className="post-user">{post.user}</div>
                {post.type === 'question' && <span className="post-type-badge">❓ Pregunta</span>}
                {post.type === 'achievement' && <span className="post-type-badge">🏆 Logro</span>}
              </div>
              <div className="post-text">{post.text}</div>
              <div className="post-footer">
                <button
                  className={`like-button ${post.liked ? 'liked' : ''}`}
                  onClick={() => handleLike(post.id)}
                  aria-label="Me gusta"
                >
                  {post.liked ? '❤️' : '🤍'} {post.likes} me gusta
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

