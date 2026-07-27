const express = require("express");
const router = express.Router();
const pool = require("../config/db");

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM bookings ORDER BY id DESC");
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("GET error:", error.message);
    return res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { 
      user_id, hotel_id, hotel_name, city, image_url, 
      price, check_in, check_out, guests, rooms, total_price 
    } = req.body;

    const newBooking = await pool.query(
      `INSERT INTO bookings 
        (user_id, hotel_id, hotel_name, city, image_url, price, check_in, check_out, guests, rooms, total_price) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
       RETURNING *`,
      [
        user_id || 1,
        hotel_id || null,
        hotel_name || "Test Hotel",
        city || null,
        image_url || null,
        price || total_price || 0,
        check_in || new Date(),
        check_out || new Date(),
        guests || 1,
        rooms || 1,
        total_price || price || 0,
      ]
    );

    return res.status(201).json(newBooking.rows[0]);
  } catch (error) {
    console.error("POST detailed error:", error);
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;const express = require("express");
const router = express.Router();
const pool = require("../config/db");

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM bookings ORDER BY id DESC");
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("GET error:", error.message);
    return res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { 
      user_id, hotel_id, hotel_name, city, image_url, 
      price, check_in, check_out, guests, rooms, total_price 
    } = req.body;

    const newBooking = await pool.query(
      `INSERT INTO bookings 
        (user_id, hotel_id, hotel_name, city, image_url, price, check_in, check_out, guests, rooms, total_price) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
       RETURNING *`,
      [
        user_id || 1,
        hotel_id || null,
        hotel_name || "Test Hotel",
        city || null,
        image_url || null,
        price || total_price || 0,
        check_in || new Date(),
        check_out || new Date(),
        guests || 1,
        rooms || 1,
        total_price || price || 0,
      ]
    );

    return res.status(201).json(newBooking.rows[0]);
  } catch (error) {
    console.error("POST detailed error:", error);
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
