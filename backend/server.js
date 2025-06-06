const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Pet Adoption Backend Server is Running! 🐕🐱',
    timestamp: new Date().toISOString()
  });
});

// API test route
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API is working perfectly!',
    status: 'success'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});