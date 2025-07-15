const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// REGISTER
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  const { name, email, password, role } = req.body; // role is optional

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Default role to 'user' if not provided
    user = new User({ name, email, password, role: role || 'user' });
    await user.save(); // Pre-save hook hashes password

    const payload = {
      id: user.id,
      email: user.email,
      isAdmin: user.role === 'admin' // ✅ Add isAdmin flag
    };

    jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1d' }, (err, token) => {
      if (err) throw err;
      res.status(201).json({ message: 'User registered', token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// LOGIN
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    
    const payload = { user: { id: user._id, role: user.role } };

    jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1d' }, (err, token) => {
      if (err) throw err;
      res.status(200).json({ message: 'Login successful', token });
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).send('Server error');
  }
};
