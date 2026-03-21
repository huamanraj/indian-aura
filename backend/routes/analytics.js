const express = require('express');
const router = express.Router();
const Analytics = require('../models/Analytics');
const authMiddleware = require('../middleware/auth');

// Track visitor (public - called on page load)
router.post('/track', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const analytics = await Analytics.findOneAndUpdate(
      { date: today },
      { $inc: { visitorCount: 1 } },
      { upsert: true, new: true }
    );

    res.json({ visitorCount: analytics.visitorCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get analytics (admin only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const analytics = await Analytics.find().sort({ date: -1 });
    const totalVisitors = analytics.reduce((sum, day) => sum + day.visitorCount, 0);
    res.json({ totalVisitors, dailyData: analytics });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;