require('dotenv').config();
const express = require('express');
const cors = require('cors');
const movieRoutes = require('./src/routes/movieRoutes');
const favoriteRoutes = require('./src/routes/favoriteRoutes');
const shareRoutes = require('./src/routes/shareRoutes');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// rotas
app.use("/api/movies", movieRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/share", shareRoutes);
app.use("/api/shared", shareRoutes);

// health check
app.get("/health", (req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// tratativa de erros
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});