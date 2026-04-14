const mongoose = require('mongoose');
const otpSchema = new mongoose.Schema(
  {
    mobile: {
      type: String,
      required: true,
      trim: true
    },

    otp: {
      type: String,
      required: true
    },

    expiresAt: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + 10 * 60 * 1000) // this is for 10 minutes
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('OTP', otpSchema);