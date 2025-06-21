const mongoose = require('mongoose');
const petSchema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: ['dog', 'cat'] },
  age: Number,
  image: String,
  description: String,
});
module.exports = mongoose.model('Pet', petSchema);
