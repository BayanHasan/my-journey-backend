const express = require("express");
const router = express.Router();
const pool = require("../config/db");

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM bookings ORDER BY id DESC");
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("GET BOOKINGS ERROR:", error);
    return res.status(200).json([]);
  }
});

module.exports = router;