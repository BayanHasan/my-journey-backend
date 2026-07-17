const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const hotelRoutes = require('./src/routes/hotelRoutes');
const bookingRoutes = require('./src/routes/bookingRoutes');

const app = express();

app.use(cors({
  origin: [
    'https://my-journey-lemon.vercel.app',
    'https://my-journey-backend-beta.vercel.app',
    'http://localhost:5173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', cors());

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/bookings', bookingRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'My Journey API is running! 🚀' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;