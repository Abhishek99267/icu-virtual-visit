const express = require('express');
const VisitRequest = require('../models/VisitRequest');
const router = express.Router();

router.post('/request', async (req, res) => {
  const request = await VisitRequest.create(req.body);
  res.json(request);
});

router.get('/history/:mobile', async (req, res) => {
  const history = await VisitRequest.find({ mobile: req.params.mobile });
  res.json(history);
});

module.exports = router;