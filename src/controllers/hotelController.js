const pool = require('../config/db');

// Get all hotels
const getHotels = async (req, res) => {
  try {
    const hotels = await pool.query('SELECT * FROM hotels ORDER BY created_at DESC');
    res.json(hotels.rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get hotel by id
const getHotelById = async (req, res) => {
  try {
    const hotel = await pool.query('SELECT * FROM hotels WHERE id = $1', [req.params.id]);
    if (hotel.rows.length === 0) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json(hotel.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Create hotel
const createHotel = async (req, res) => {
  const { name, city, country, price, rating, image_url } = req.body;
  try {
    const hotel = await pool.query(
      'INSERT INTO hotels (name, city, country, price, rating, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, city, country, price, rating, image_url]
    );
    res.status(201).json(hotel.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getHotels, getHotelById, createHotel };