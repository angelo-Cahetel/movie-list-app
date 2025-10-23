const mongoose = require('mongoose');

const SharedListSchema = new mongoose.Schema({
  shareId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  favorites: [{ type: Object }],
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true }
});

module.exports = mongoose.model('SharedList', SharedListSchema);