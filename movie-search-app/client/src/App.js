import logo from './logo.svg';
import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSearch = async (query) => {
    try {
      const response = await axios.get('http://localhost:5002/api/search/${query}');
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error searching for movies:', error);
    }
  };

  const handleSelectMovie = (movieId) => {
    setSelectedMovie(movieId);
  };

  return (
    <div className="App">
      <SearchBar onSearch={handleSearch} />
      {selectedMovie ? (
        <MovieDetail movieId={selectedMovie} />
      ) : (
        <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
      )}
    </div>
  );
};

export default App;
