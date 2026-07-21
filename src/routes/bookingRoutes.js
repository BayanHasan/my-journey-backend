const express = require("express");
const router = express.Router();

// إذا كان لديك middleware للتوثيق استدعيه هنا، أو اترك المسار بسيطاً للتجربة
router.post("/", async (req, res) => {
  try {
    const pool = require("../config/db");
    const { hotel_name, price, check_in, check_out, userId } = req.body;

    const result = await pool.query(
      `INSERT INTO bookings (user_id, hotel_name, price, check_in, check_out) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [userId || 1, hotel_name || "Hotel", price || 0, check_in || null, check_out || null]
    );

    res.status(201).json({ message: "Booking successful", booking: result.rows[0] });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ error: error.message });
  }
});
// مسار لعرض كافة الحجوزات عند فتح الرابط في المتصفح (GET)
router.get("/", async (req, res) => {
  try {
    const pool = require("../config/db");
    const result = await pool.query("SELECT * FROM bookings ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;