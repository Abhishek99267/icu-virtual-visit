const express = require('express');
const VisitRequest = require('../models/VisitRequest');
const Patient = require('../models/Patient');
const router = express.Router();

router.get('/pending', async (req, res) => {
  const requests = await VisitRequest.find({ status: 'pending' });
  res.json(requests);
});

router.post('/approve/:id', async (req, res) => {
  const { timeLimit } = req.body;

  const request = await VisitRequest.findByIdAndUpdate(
    req.params.id,
    {
         status: 'approved',
      roomId: 'ROOM_' + Date.now(),
      timeLimit
    },
    { new: true }
  );

  res.json(request);
});

router.post('/reject/:id', async (req, res) => {
  const request = await VisitRequest.findByIdAndUpdate(
    req.params.id,
    { status: 'rejected' },
    { new: true }
  );
    res.json(request);
});

router.post('/dnd/:patientId', async (req, res) => {
  const patient = await Patient.findOneAndUpdate(
    { patientId: req.params.patientId },
    { doNotDisturb: true, status: 'critical' },
    { new: true }
  );

  res.json({ message: 'Patient marked critical', patient });
});

module.exports = router;