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

// Connect to MongoDB only if NOT in test environment
if (process.env.NODE_ENV !== 'test') {
  connectDB();
}

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', authRoutes);                     // Public auth routes
app.use('/api/contact', contactRoutes);          // Public contact route
app.use('/api/pets', verifyToken, petRoutes);    // Protected pet routes
app.use('/api/rescues', verifyToken, rescueRoutes); // Protected rescue routes

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack || err);
  res.status(500).json({ message: 'Something went wrong on the server.' });
});

// Start server only if run directly, not during tests
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
