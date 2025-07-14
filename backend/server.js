require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const petRoutes = require('./routes/pets');
const rescueRoutes = require('./routes/rescue');
const contactRoutes = require('./routes/contact');

const { verifyToken } = require('./middleware/auth');

const app = express();

// Connect to MongoDB
connectDB();

// Enable CORS for your frontend URL
app.use(cors({
  origin: 'http://localhost:5173', // adjust to your frontend origin
  credentials: true,
}));

// Parse JSON bodies
app.use(express.json());

// Serve static files from uploads folder so images are accessible
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', authRoutes);              // auth routes: register/login
app.use('/api/contact', contactRoutes);   // contact routes
app.use('/api/pets', verifyToken, petRoutes);       // pets routes, protected
app.use('/api/rescues', verifyToken, rescueRoutes); // rescues routes, protected

// Basic catch-all error handler (optional)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Server error' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
