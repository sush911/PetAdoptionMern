require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Route files
const authRoutes = require('./routes/auth');
const petRoutes = require('./routes/pets');
const rescueRoutes = require('./routes/rescue');
const contactRoutes = require('./routes/contact');

// ✅ Destructure middleware functions properly
const { verifyToken, verifyAdmin } = require('./middleware/auth');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Public Routes
app.use('/api', authRoutes);
app.use('/api/contact', contactRoutes); // POST is public, GET/DELETE protected inside route

// Protected Routes
app.use('/api/pets', verifyToken, petRoutes);
app.use('/api/rescues', verifyToken, rescueRoutes);

// Server Listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
