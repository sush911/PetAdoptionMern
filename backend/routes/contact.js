const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');

// POST /api/contact
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ msg: 'All fields are required' });
  }

  try {
    const newMsg = new ContactMessage({ name, email, message });
    await newMsg.save();
    res.status(201).json({ msg: 'Message received successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
