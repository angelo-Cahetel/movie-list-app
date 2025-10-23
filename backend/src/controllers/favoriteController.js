const favoritesDB = new Map();

// Obter todos os favoritos de um usuário
exports.getFavorites = (req, res) => {
  try {
    const { userId } = req.params;
    const favorites = favoritesDB.get(userId) || [];
    res.json({ favorites });
  } catch (error) {
    console.error('Error fetching favorites:', error.message);
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
};

// Adicionar filme aos favoritos
exports.addFavorite = (req, res) => {
  try {
    const { userId } = req.params;
    const movie = req.body;

    if (!movie || !movie.id) {
      return res.status(400).json({ error: 'Invalid movie data' });
    }

    const favorites = favoritesDB.get(userId) || [];
    
    // Verificar se já existe
    if (favorites.some(f => f.id === movie.id)) {
      return res.status(409).json({ error: 'Movie already in favorites' });
    }

    favorites.push(movie);
    favoritesDB.set(userId, favorites);

    res.status(201).json({ 
      message: 'Movie added to favorites',
      favorites 
    });
  } catch (error) {
    console.error('Error adding favorite:', error.message);
    res.status(500).json({ error: 'Failed to add favorite' });
  }
};

// Remover filme dos favoritos
exports.removeFavorite = (req, res) => {
  try {
    const { userId, movieId } = req.params;
    const favorites = favoritesDB.get(userId) || [];
    
    const filtered = favorites.filter(f => f.id !== parseInt(movieId));
    favoritesDB.set(userId, filtered);

    res.json({ 
      message: 'Movie removed from favorites',
      favorites: filtered 
    });
  } catch (error) {
    console.error('Error removing favorite:', error.message);
    res.status(500).json({ error: 'Failed to remove favorite' });
  }
};