require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const petRoutes = require('./routes/pets'); // 👈 per routes
const rescueRoutes = require('./routes/rescues'); //  rescue routes
const { verifyToken } = require('./middleware/auth'); //  Middleware

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api/pets', verifyToken, petRoutes);       // Protected pet routes
app.use('/api/rescues', verifyToken, rescueRoutes); //  rescue routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
