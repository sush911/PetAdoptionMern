const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');
const { verifyToken, verifyAdmin } = require('../middleware/auth'); // Destructure both middlewares

// POST /api/contact - Public: Users submit contact messages
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

// GET /api/contact - Admin only: Get all contact messages
router.get('/', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// DELETE /api/contact/:id - Admin only: Delete a contact message
router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const deleted = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ msg: 'Message not found' });
    }
    res.json({ msg: 'Message deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
