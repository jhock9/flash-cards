const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  accessToken: String,
  refreshToken: String,
  expiryDate: Number,
  isGoogleAuthenticated: { type: Boolean, default: false },
}, { timestamps: true });

const Token = mongoose.model('Token', tokenSchema);

// Export to googleAuthRoutes.js and googlePhotosAPI.js
module.exports = Token;