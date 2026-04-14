const mongoose = require('mongoose');

module.exports = mongoose.model('SessionLog', new mongoose.Schema({
  roomId: String,
  patientId: String,
  familyMobile: String,
  startTime: Date,
  endTime: Date,
  duration: Number
}));