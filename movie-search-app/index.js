const express = require('express');
const axios = require('axios');
const app = express();
const port = 5000;
const TMDB_API_KEY = 'cf53dea4dad32e943a22ae8387b2dbaa';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

app.use(express.json());

app.get('/api/search/:title', async (req, res) => {
    try {
        const response = await axios.get('${TMDB_BASE_URL}/search/movie', {
            params: {
                api_key: TMDB_API_KEY,
                query: req.params.title
            },
        });
        res.json(response.data);
    } catch (error) {
     res.status(500).send(error.message);
    }
});

app.get('/api/movie/:id', async (req, res) => {
    try {
    const response = await axios.get('${TMDB_BASE_URL}/movie/${req.params.id}', {
        params: {
            api_key: TMDB_API_KEY,
            append_to_response: 'videos,credits',
        },
    });
    res.json(response.data);
    } catch (error) {
     res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log('Server is running on http://localhost:${port}');
});