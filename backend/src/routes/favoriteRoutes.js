const express = require('express');
const router = express.Router();
const movieController = require('../controllers/favoriteController');

router.get('/:userId', favoriteController.getFavorites);
router.post('/:userId', favoriteController.addFavorite);
router.delete('/:userId/:movieId', favoriteController.removeFavorite);

module.exports = router;