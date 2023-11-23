const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  productUrl: { type: String, required: true },
  tagsFromGoogle: { type: String, required: true },
  tags: [{ 
    name: String, 
    qty: { type: Number, default: 0 }, 
    locked: { type: Boolean, default: false } 
  }],
  isFavorite: { type: Boolean, default: false },
  selectedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

photoSchema.index({ 'tags.name': 1 });
photoSchema.index({ tagsFromGoogle: 'text' });

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
