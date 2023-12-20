const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  lockedTags: [{
    name: { type: mongoose.Schema.Types.ObjectId, ref: 'Photo'},
    qty: { type: Number, default: 0 }, 
    locked: { type: Boolean, default: false } 
  }],
  lockedPhoto: { type: mongoose.Schema.Types.ObjectId, ref: 'Photo' },
}, { timestamps: true });

const Session = mongoose.model('Session', sessionSchema);

//!! export to where?
module.exports = Session;