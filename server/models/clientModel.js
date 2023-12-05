const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const Client = mongoose.model('Client', clientSchema);

//!! export to where?
// Also used in sessionModel.js
module.exports = Client;