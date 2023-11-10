const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  accessToken: String,
  refreshToken: String,
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;