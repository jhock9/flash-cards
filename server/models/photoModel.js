const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  baseUrl: { type: String, required: true },
  tagsFromGoogle: [{ type: String, required: true }],
}, { timestamps: true });

photoSchema.index({ 'tags.name': 1 });
photoSchema.index({ tagsFromGoogle: 'text' });

const Photo = mongoose.model('Photo', photoSchema);

// Export to photoController.js and photoDBRoutes.js
// Also used in appointmentModel.js
module.exports = Photo;
