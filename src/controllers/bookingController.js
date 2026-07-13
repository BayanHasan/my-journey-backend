const pool = require('../config/db');

// Create booking
const createBooking = async (req, res) => {
  const { hotel_id, check_in, check_out, guests } = req.body;
  const user_id = req.user.id;
  try {
    const hotel = await pool.query('SELECT * FROM hotels WHERE id = $1', [hotel_id]);
    if (hotel.rows.length === 0) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    const nights = Math.ceil((new Date(check_out) - new Date(check_in)) / (1000 * 60 * 60 * 24));
    const total_price = hotel.rows[0].price * nights;
    const booking = await pool.query(
      'INSERT INTO bookings (user_id, hotel_id, check_in, check_out, guests, total_price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [user_id, hotel_id, check_in, check_out, guests, total_price]
    );
    res.status(201).json(booking.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get user bookings
const getUserBookings = async (req, res) => {
  const user_id = req.user.id;
  try {
    const bookings = await pool.query(
      `SELECT b.*, h.name as hotel_name, h.city, h.image_url 
       FROM bookings b 
       JOIN hotels h ON b.hotel_id = h.id 
       WHERE b.user_id = $1 
       ORDER BY b.created_at DESC`,
      [user_id]
    );
    res.json(bookings.rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { createBooking, getUserBookings };