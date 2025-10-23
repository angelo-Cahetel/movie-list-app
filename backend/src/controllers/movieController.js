const axios = require('axios');
const tmdbConfig = require('../config/tmdb');

// Buscar filmes
exports.searchMovies = async (req, res) => {
  try {
    const { query, page = 1 } = req.query;
    
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    const response = await axios.get(`${tmdbConfig.baseUrl}/search/movie`, {
      params: {
        api_key: tmdbConfig.apiKey,
        query: query,
        language: tmdbConfig.language,
        page: page
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error searching movies:', error.message);
    res.status(500).json({ error: 'Failed to search movies' });
  }
};

// Obter detalhes de um filme
exports.getMovieDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await axios.get(`${tmdbConfig.baseUrl}/movie/${id}`, {
      params: {
        api_key: tmdbConfig.apiKey,
        language: tmdbConfig.language
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching movie details:', error.message);
    res.status(500).json({ error: 'Failed to fetch movie details' });
  }
};

// Obter filmes populares
exports.getPopularMovies = async (req, res) => {
  try {
    const { page = 1 } = req.query;

    const response = await axios.get(`${tmdbConfig.baseUrl}/movie/popular`, {
      params: {
        api_key: tmdbConfig.apiKey,
        language: tmdbConfig.language,
        page: page
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching popular movies:', error.message);
    res.status(500).json({ error: 'Failed to fetch popular movies' });
  }
};