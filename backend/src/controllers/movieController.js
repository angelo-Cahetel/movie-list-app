const axios = require("axios");
const tmdbConfig = require("../config/tmdb");

exports.getMovieDetails = async (req, res) => {
    try {
        const { query, page = 1 } = req.query;
        const response = await axios.get(`${tmdbConfig.baseUrl}/search/movie`,{
            params: {
                api_key: tmdbConfig.apiKey,
                query,
                language: tmdbConfig.language,
                page
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({error: "Failed to search movies"});
    }
};

exports.getMoviesDetails = async (req, res) => {
    // implementação
};

exports.getPopularMovies = async (req, res) => {
    // implementação
};