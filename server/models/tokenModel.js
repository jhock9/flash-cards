const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  accessToken: String,
  refreshToken: String,
});

const Token = mongoose.model('Token', tokenSchema);

// Export to googleAuthRoutes.js
module.exports = Token;