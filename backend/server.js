require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Importar rotas
const movieRoutes = require('./src/routes/movieRoutes');
const favoriteRoutes = require('./src/routes/favoriteRoutes');
const shareRoutes = require('./src/routes/shareRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/movies', movieRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/share', shareRoutes);
app.use('/api/shared', shareRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Rota raiz
app.get('/', (req, res) => {
  res.json({
    message: 'Movie List API',
    version: '1.0.0',
    endpoints: {
      movies: '/api/movies',
      favorites: '/api/favorites',
      share: '/api/share',
      health: '/health'
    }
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`API Base: http://localhost:${PORT}/api`);
});

module.exports = app;