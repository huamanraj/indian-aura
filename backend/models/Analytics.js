const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  visitorCount: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now,
    unique: true
  }
});

module.exports = mongoose.model('Analytics', analyticsSchema);