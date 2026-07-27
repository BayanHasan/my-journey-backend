const express = require("express");
const cors = require("cors");
const app = express();

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION:", err);
});

app.use(cors());
app.use(express.json());

console.log("Loading booking routes...");
const bookingRoutes = require("./routes/bookingRoutes");
app.use("/api/bookings", bookingRoutes);
console.log("Booking routes loaded successfully.");

console.log("Loading auth routes...");
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
console.log("Auth routes loaded successfully.");

app.get("/", (req, res) => {
  res.send("My Journey API is running! 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;