const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  productUrl: { type: String, required: true },
  // baseUrl: { type: String, required: true },
  // mimeType: { type: String, required: true },
  description: { type: String, required: true },
  // selectedTags: [{ type: String }],
  tags: [{ 
    name: String, 
    qty: { type: Number, default: 0 }, 
    locked: { type: Boolean, default: false } 
  }],
  isFavorite: { type: Boolean, default: false },
  selectedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

photoSchema.index({ 'tags.name': 1 });
photoSchema.index({ googleId: 1 });
photoSchema.index({ description: 'text' });

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
