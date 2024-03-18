// src/components/Pagination.js
import React from 'react';

const Pagination = ({ page, setPage, maxPages }) => {
  return (
    <div>
      <button onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))} disabled={page === 1}>
        Página Anterior
      </button>
      <button onClick={() => setPage(prevPage => Math.min(prevPage + 1, maxPages))}>
        Próxima Página
      </button>
    </div>
  );
};

export default Pagination;
