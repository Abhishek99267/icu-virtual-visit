const mongoose = require('mongoose');

module.exports = mongoose.model('Patient', new mongoose.Schema({
  patientId: { type: String, unique: true },
  patientName: String,
  bedNumber: String,
  status: {
    type: String,
    enum: ['stable', 'critical'],
    default: 'stable'
  },
  doNotDisturb: { type: Boolean, default: false }
}));