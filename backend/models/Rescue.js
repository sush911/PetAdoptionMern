const mongoose = require('mongoose');

const rescueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  animalType: { type: String, required: true },
  description: { type: String },
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'pending' },
});

module.exports = mongoose.model('Rescue', rescueSchema);
