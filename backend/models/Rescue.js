const mongoose = require('mongoose');
const rescueSchema = new mongoose.Schema({
  location: String,
  date: Date,
  animalType: String,
  status: String,
});
module.exports = mongoose.model('Rescue', rescueSchema);
