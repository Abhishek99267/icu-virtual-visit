const mongoose = require('mongoose');

module.exports = mongoose.model('VisitRequest', new mongoose.Schema({
  patientId: String,
  familyName: String,
  mobile: String,
  relation: String,
  preferredSlot: String,
  message: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  roomId: String,
  timeLimit: Number,
  approvedBy: String,
  createdAt: { type: Date, default: Date.now }
}));