// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from './components/Pagination';
import MovieList from './components/MovieList';

const App = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api-data');
        setData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  const maxPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div>
      <MovieList movies={data} />
      <Pagination page={page} setPage={setPage} maxPages={maxPages} />
    </div>
  );
};

export default App;
