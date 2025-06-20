const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // ❌ Remove manual hashing
    user = new User({ name, email, password });
    await user.save(); // This will call the `pre('save')` hook to hash the password

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.status(201).json({ message: 'User registered', token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};


exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array());
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  const { email, password } = req.body;
  console.log('Received request body:', req.body);

  try {
    let user = await User.findOne({ email });
    console.log('Found user:', user);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('Hash from DB:', user.password);
    console.log('Comparing password:', password);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match result:', isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      console.log('Generated token:', token);
      res.status(200).json({ message: 'Login successful', token });
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).send('Server error');
  }
};
