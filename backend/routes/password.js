// routes/auth.js (or a new file like routes/resetPassword.js)
const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const User = require('../models/User');
const transporter = require('../utils/mailer'); // <- your nodemailer config
const jwt = require('jsonwebtoken');

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // 1. Generate token
    const token = crypto.randomBytes(32).toString('hex');

    // 2. Set token and expiry
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // 3. Send email
    const resetLink = `http://localhost:5173/reset-password/${token}`; // adjust to your frontend URL

    await transporter.sendMail({
      to: user.email,
      subject: 'Reset your password',
      html: `
        <h3>Password Reset Request</h3>
        <p>Click <a href="${resetLink}">here</a> to reset your password.</p>
        <p>This link expires in 1 hour.</p>
      `,
    });

    res.status(200).json({ message: 'Reset link sent to your email' });
  } catch (error) {
    console.error('Error in forgot-password:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/reset-password/:token', async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // still valid
    });

    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    user.password = password; // bcrypt will hash it
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error in reset-password:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
