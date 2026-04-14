const express = require('express');
const router = express.Router();
const SessionLog = require('../models/SessionLog');
const Feedback = require('../models/Feedback');


// Save session log after video call ends
router.post('/log', async (req, res) => {
  try {
    const {
      roomId,
      patientId,
      familyMobile,
      startTime,
      endTime,
      duration
    } = req.body;

    const session = await SessionLog.create({
      roomId,
      patientId,
      familyMobile,
      startTime,
      endTime,
      duration
    });

    res.status(201).json({
      message: 'Session log saved successfully',
      session
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error saving session log',
      error: error.message
    });
  }
});


// Save feedback after call
router.post('/feedback', async (req, res) => {
  try {
    const { roomId, rating, comment } = req.body;

    const feedback = await Feedback.create({
      roomId,
      rating,
      comment
    });

    res.status(201).json({
      message: 'Feedback saved successfully',
      feedback
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error saving feedback',
      error: error.message
    });
  }
});


// Get session history by family mobile
router.get('/history/:mobile', async (req, res) => {
  try {
    const logs = await SessionLog.find({
      familyMobile: req.params.mobile
    }).sort({ startTime: -1 });

    res.json(logs);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching history',
      error: error.message
    });
  }
});


// Get feedback by room ID
router.get('/feedback/:roomId', async (req, res) => {
  try {
    const feedback = await Feedback.find({
      roomId: req.params.roomId
    });

    res.json(feedback);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching feedback',
      error: error.message
    });
  }
});

module.exports = router;