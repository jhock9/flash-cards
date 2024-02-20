const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: false},
  savedTags: [{
    name: { type: String, required: true},
    qty: { type: Number, default: 0 }, 
    locked: { type: Boolean, default: false } 
  }],
  savedPhotos: [{
    photo: { type: mongoose.Schema.Types.ObjectId, ref: 'Photo' },
    selectedTag: { type: String }
  }],
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);

// Export to appointmentRoutes.js
module.exports = Appointment;