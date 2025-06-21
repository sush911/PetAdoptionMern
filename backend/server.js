require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const petRoutes = require('./routes/pets');
const rescueRoutes = require('./routes/rescue'); // singular (file named rescue.js)
const verifyToken = require('./middleware/auth');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));  // your frontend origin
app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api/pets', verifyToken, petRoutes);
app.use('/api/rescues', verifyToken, rescueRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
