import { useState } from 'react';
import { getUser } from '../data/user.js';

/**
 * Página de comunidad simulada
 * 
 * Muestra una lista de publicaciones educativas mockeadas
 * Permite dar "me gusta" y agregar nuevos posts (solo localmente, no persistente)
 */
export default function Community() {
  
  // Posts iniciales simulados
  const [posts, setPosts] = useState([
    { 
      id: 1, 
      user: "Sofi", 
      text: "Hoy completé el nivel de presupuesto 🎯", 
      likes: 3,
      liked: false
    },
    { 
      id: 2, 
      user: "Leo", 
      text: "Aprendí a diferenciar gastos fijos y variables 💡", 
      likes: 5,
      liked: false
    },
    { 
      id: 3, 
      user: "Ana", 
      text: "Mi racha de 7 días sigue creciendo! 🔥", 
      likes: 8,
      liked: false
    },
    { 
      id: 4, 
      user: "Carlos", 
      text: "Finalmente entendí cómo funciona un fondo de emergencia 💰", 
      likes: 12,
      liked: false
    },
  ]);

  const [newPostText, setNewPostText] = useState('');

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
      const newPost = {
        id: Date.now(),
        user: user.name || "Usuario", // Usar el nombre del usuario actual
        text: newPostText.trim(),
        likes: 0,
        liked: false
      };
      setPosts([newPost, ...posts]);
      setNewPostText('');
    }
  };

  return (
    <div className="page">
      <h1>Comunidad Finast</h1>
      <p className="page-description">Comparte tu progreso y aprende con otros</p>

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

      {/* Lista de posts */}
      <div className="community-posts">
        {posts.length === 0 ? (
          <p className="no-posts">Aún no hay publicaciones. ¡Sé el primero en compartir!</p>
        ) : (
          posts.map(post => (
            <div key={post.id} className="community-post">
              <div className="post-header">
                <div className="post-avatar">
                  {post.user.charAt(0).toUpperCase()}
                </div>
                <div className="post-user">{post.user}</div>
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

