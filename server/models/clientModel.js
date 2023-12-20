const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  clientID: { type: String, required: true },
  
}, { timestamps: true });

const Client = mongoose.model('Client', clientSchema);

// Export to clientRoutes.js
// Also used in sessionModel.js
module.exports = Client;