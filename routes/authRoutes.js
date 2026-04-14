
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const express = require('express');
const jwt = require('jsonwebtoken');
const OTP = require('../models/OTP');

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({
        message: 'User already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.json({
      message: 'Signup successful',
      user
    });
  } catch (error) {
    res.status(500).json({
      message: 'Signup failed',
      error: error.message
    });
  }
});



// SEND OTP

router.post('/send-otp', async (req, res) => {
  try {
    const { mobile } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await OTP.create({
      mobile,
      otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 min
    });

    res.json({
      message: 'OTP sent successfully',
      otp
    });
  } catch (error) {
    res.status(500).json({
      message: 'OTP send failed',
      error: error.message
    });
  }
});



// VERIFY OTP

router.post('/verify-otp', async (req, res) => {
  try {
    const { mobile, otp } = req.body;

    const record = await OTP.findOne({ mobile, otp });

    if (!record) {
      return res.status(400).json({
        message: 'Invalid OTP'
      });
    }

    if (new Date() > record.expiresAt) {
      return res.status(400).json({
        message: 'OTP expired'
      });
    }

    const token = jwt.sign(
      { mobile },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'OTP verified successfully',
      token
    });
  } catch (error) {
    res.status(500).json({
      message: 'OTP verification failed',
      error: error.message
    });
  }
});

module.exports = router;
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: 'Invalid email'
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({
        message: 'Invalid password'
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Login successful',
      token
    });
  } catch (error) {
    res.status(500).json({
      message: 'Login failed',
      error: error.message
    });
  }
});

