import { useState, useEffect } from 'react';
import GlossaryList from '../components/GlossaryList.jsx';
import { getRandomTerm } from '../data/glossary.js';

/**
 * Página del diccionario financiero
 * Muestra un buscador, término del día y lista de términos
 */
export default function Glossary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [termOfTheDay, setTermOfTheDay] = useState(null);

  // Cargar término del día al montar el componente
  useEffect(() => {
    // Obtener término del día guardado o generar uno nuevo
    const today = new Date().toDateString();
    const saved = localStorage.getItem('finast-term-of-day');
    
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.date === today) {
          setTermOfTheDay(data.term);
        } else {
          // Generar nuevo término del día
          const newTerm = getRandomTerm();
          setTermOfTheDay(newTerm);
          localStorage.setItem('finast-term-of-day', JSON.stringify({
            date: today,
            term: newTerm
          }));
        }
      } catch {
        const newTerm = getRandomTerm();
        setTermOfTheDay(newTerm);
        localStorage.setItem('finast-term-of-day', JSON.stringify({
          date: today,
          term: newTerm
        }));
      }
    } else {
      const newTerm = getRandomTerm();
      setTermOfTheDay(newTerm);
      localStorage.setItem('finast-term-of-day', JSON.stringify({
        date: today,
        term: newTerm
      }));
    }
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="page glossary-page">
      <div className="glossary-header">
        <h1>📘 Diccionario Financiero</h1>
        <p className="glossary-subtitle">
          Aprende los conceptos clave de educación financiera de manera simple y clara
        </p>
      </div>

      {/* Término del día */}
      {termOfTheDay && !searchQuery && (
        <div className="term-of-day-card">
          <div className="term-of-day-header">
            <span className="day-badge">🌟 Término del Día</span>
          </div>
          <div className="term-of-day-content">
            <div className="term-of-day-icon">{termOfTheDay.icon}</div>
            <div className="term-of-day-info">
              <h3 className="term-of-day-name">{termOfTheDay.term}</h3>
              <p className="term-of-day-definition">{termOfTheDay.definition}</p>
            </div>
          </div>
        </div>
      )}

      {/* Buscador */}
      <div className="glossary-search-container">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="glossary-search-input"
            placeholder="Buscar término o definición..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchQuery && (
            <button
              className="clear-search-btn"
              onClick={clearSearch}
              title="Limpiar búsqueda"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Lista de términos */}
      <GlossaryList searchQuery={searchQuery} />
    </div>
  );
}

