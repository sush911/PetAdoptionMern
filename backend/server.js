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
connectDB();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/pets', verifyToken, petRoutes);
app.use('/api/rescues', verifyToken, rescueRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
