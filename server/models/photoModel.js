const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  awsKey: { type: String, required: true, unique: true, },
  baseUrl: { type: String, required: true, },
  tagsFromAws: { type: [String], default: [], },
}, { timestamps: true });

photoSchema.index({ tagsFromAws: 'text' });

const Photo = mongoose.model('PhotoAWS', photoSchema);

// Export to photoController.js and photoDBRoutes.js
// Also used in appointmentModel.js
module.exports = Photo;
