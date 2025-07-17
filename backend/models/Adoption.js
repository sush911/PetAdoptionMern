const mongoose = require('mongoose');

const AdoptionSchema = new mongoose.Schema({
  petId: String,
  petName: String,
  name: String,
  email: String,
  phone: String,
  address: String,
  message: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  }
}, { timestamps: true });

module.exports = mongoose.model('Adoption', AdoptionSchema);
