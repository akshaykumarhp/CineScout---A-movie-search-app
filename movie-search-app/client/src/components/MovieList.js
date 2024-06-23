import React from 'react';

const MovieList = ({ movies, onSelectMovie }) => {
    return (
        <div>
            {movies.map((movie) => (
                <div key={movie.id} onClick={() => onSelectMovie(movie.id)}>
                    <h3>{movie.title}</h3>
                    <p>{movie.overview}</p>
                </div>
            ))}
        </div>
    );
};

export default MovieList;