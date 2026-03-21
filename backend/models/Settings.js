const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  whatsappNumber: {
    type: String,
    default: ''
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

settingsSchema.pre('save', function () {
  this.updatedAt = Date.now();
});

module.exports = mongoose.model('Settings', settingsSchema);
