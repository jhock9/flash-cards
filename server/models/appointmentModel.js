const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  savedTags: [{
    name: { type: mongoose.Schema.Types.ObjectId, ref: 'Photo'},
    qty: { type: Number, default: 0 }, 
    locked: { type: Boolean, default: false } 
  }],
  savedPhotos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Photo' }],
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);

// Export to appointmentRoutes.js
module.exports = Appointment;