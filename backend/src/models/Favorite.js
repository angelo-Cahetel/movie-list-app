const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  movieId: { type: String, required: true },
  movieData: { type: Object, required: true },
  createAt: { type: Date, default: Date.now },
});

FavoriteSchema.index({ userId: 1, movieId: 1 }, { unique: true });

module.exports = mongoose.model("Favorite", FavoriteSchema);
