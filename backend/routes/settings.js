const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');
const authMiddleware = require('../middleware/auth');

// Get settings (public - frontend needs whatsapp number)
router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({ whatsappNumber: '' });
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update settings (admin only)
router.put('/', authMiddleware, async (req, res) => {
  try {
    const { whatsappNumber } = req.body;

    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings({ whatsappNumber: whatsappNumber || '' });
    } else {
      settings.whatsappNumber = whatsappNumber !== undefined ? whatsappNumber : settings.whatsappNumber;
    }

    const updated = await settings.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
