const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false, // <== ✅ make optional for Google login users
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  provider: {
    type: String,
    enum: ['local', 'google'],
    default: 'local', // <== 'local' for normal users, 'google' for Google OAuth
  },
  avatar: {
    type: String, // ✅ to store Google profile picture
  },
});

// Only hash password if it's a local signup
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next(); 
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', UserSchema);
