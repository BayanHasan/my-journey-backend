const express = require('express');
const router = express.Router();
const { getHotels, getHotelById, createHotel } = require('../controllers/hotelController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getHotels);
router.get('/:id', getHotelById);
router.post('/', protect, createHotel);

module.exports = router;