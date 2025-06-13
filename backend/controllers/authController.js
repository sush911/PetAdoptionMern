const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator'); // Add this line

exports.register = async (req, res) => {
  const errors = validationResult(req); // Now defined
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ message: 'User registered', token });
      }
    );
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
  console.log('Login attempt:', { email, password });

  try {
    let user = await User.findOne({ email });
    console.log('Found user:', user);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('Comparing password:', password, 'with hash:', user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match result:', isMatch);

    // Manual test to verify bcrypt
    const testHash = await bcrypt.hash('password123', 10); // Generate a new hash to compare
    const testMatch = await bcrypt.compare('password123', testHash);
    console.log('Test match with newly generated hash:', testMatch);

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
    console.error('Error during login:', error.message);
    res.status(500).send('Server error');
  }
};