const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ['dog', 'cat'],
    required: true,
    lowercase: true, // <-- this ensures the value is stored in lowercase
    trim: true
  },
  age: { type: Number, required: true },
  image: { type: String, required: true }, // saved filename
  description: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Pet', petSchema);
