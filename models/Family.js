const mongoose = require('mongoose');

module.exports = mongoose.model('Family', new mongoose.Schema({
  mobile: { type: String, required: true, unique: true },
  name: String,
  relation: String,
  createdAt: { type: Date, default: Date.now }
}));