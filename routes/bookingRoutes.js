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
    const { user_id, hotel_name, price, check_in, check_out } = req.body;
    
    const newBooking = await pool.query(
      "INSERT INTO bookings (user_id, hotel_name, price, check_in, check_out) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        user_id || 1, 
        hotel_name || "Test Hotel", 
        price || 0, 
        check_in || new Date(), 
        check_out || new Date()
      ]
    );

    return res.status(201).json(newBooking.rows[0]);
  } catch (error) {
    console.error("POST detailed error:", error);
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;