const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/petadoptionDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function updatePassword() {
  const user = await User.findOne({ email: 'ram@example.com' });
  if (user) {
    user.password = await bcrypt.hash('password123', 10);
    await user.save();
    console.log('Updated password hash:', user.password);
  }
  mongoose.disconnect();
}

updatePassword().catch(console.error);