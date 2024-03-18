import React, { useState, useEffect } from 'react';
import './MovieList.css';

const MovieList = ({ movies }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [highlightLoading, setHighlightLoading] = useState(false);

  useEffect(() => {
    setHighlightLoading(true);

    const timeoutId = setTimeout(() => {
      setHighlightLoading(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [currentPage]); // Executa quando a página atual muda

  const extractUrls = (inputString) => {
    const urlRegex = /https:[^"&]+\.jpg/g;
    const match = inputString.match(urlRegex);
    return match ? [match[0]] : [];
  };

  const handlePageChange = async (page) => {
    setLoading(true);
    // Simule uma operação assíncrona (pode ser uma chamada de API)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setCurrentPage(page);
    setLoading(false);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMovies = movies.slice(startIndex, endIndex);

  return (
    <div className="movie-list-container">
      {currentMovies.map((movie) => {
        const posters = extractUrls(movie.poster);

        return (
          <div key={movie.id} className="movie-card">
            <h2>{movie.threadtitle}</h2>
            <p><strong>Original:</strong> {movie.original}</p>
            <p><strong>Direção:</strong> {movie.direcao}</p>
            <p><strong>Gênero:</strong> {movie.genero}</p>
            <p><strong>Duração:</strong> {movie.duracao}</p>
            {posters.length > 0 && (
              <img src={posters[0]} alt={`${movie.threadtitle} Poster`} className="movie-poster" />
            )}
          </div>
        );
      })}

      <div className="pagination">
        {Array.from({ length: Math.ceil(movies.length / itemsPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {loading && (
        <div className={`loading-indicator ${highlightLoading ? 'efeto-destaque' : ''}`}>
          Carregando...
        </div>
      )}
    </div>
  );
};

export default MovieList;
