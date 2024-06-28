import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieDetail = ({ movieId }) => {
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get('http://localhost:5002/api/movie/${movieId}');
                setMovie(response.data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };
        fetchMovie();
    }, [movieId]);

    if (!movie) return <div>Loading...</div>

    const trailer = movie.videos.results.find(video => video.type === 'Trailer');

    return (
        <div>
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
            <h2>Cast</h2>
            <ul>
                {movie.credits.cast.map(actor => (
                    <li key={actor.id}>{actor.name} as {actor.character}</li>
                ))}
            </ul>
            {trailer && (
                <div>
                    <h2>Trailer</h2>
                    <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${trailer.key}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            )}
        </div>
    );
};

export default MovieDetail;