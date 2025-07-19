const express = require('express');
const router = express.Router();
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Replace this with your actual Google client ID
const client = new OAuth2Client(
  '434642760888-vpkmml8fv6801pol73ncngjc63082gk7.apps.googleusercontent.com'
);

// POST /api/auth/google
router.post('/', async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: 'Missing token from request body' });
  }

  try {
    // 1. Verify token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '434642760888-vpkmml8fv6801pol73ncngjc63082gk7.apps.googleusercontent.com',
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    if (!email) {
      return res.status(400).json({ message: 'Email not available in token payload' });
    }

    // 2. Find or create user
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name: name || 'Google User',
        email,
        password: '', // No password because it's Google-authenticated
        avatar: picture,
        provider: 'google',
      });

      await user.save();
    }

    // 3. Sign JWT using SECRET_KEY
    const jwtToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.SECRET_KEY, // ✅ Using SECRET_KEY instead of JWT_SECRET
      { expiresIn: '7d' }
    );

    res.status(200).json({ token: jwtToken });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(401).json({ message: 'Invalid or expired Google token' });
  }
});

module.exports = router;
