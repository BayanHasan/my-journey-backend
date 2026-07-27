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