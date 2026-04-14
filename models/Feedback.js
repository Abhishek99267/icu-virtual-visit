const mongoose = require('mongoose');

module.exports = mongoose.model('Feedback', new mongoose.Schema({
  roomId: String,
  rating: Number,
  comment: String
}));