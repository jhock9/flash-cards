const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  savedPhotos: [{ type: String }],
}, { timestamps: true });

const Session = mongoose.model('Session', sessionSchema);

//!! export to where?
module.exports = Session;