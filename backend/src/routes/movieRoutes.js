const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/search', movieController.searchMovies);
router.get('/popular', movieController.getPopularMovies);
router.get('/:id', movieController.getMovieDetails);

module.exports = router;