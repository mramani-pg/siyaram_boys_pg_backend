const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(cors({
  origin: "https://siyaram-boys-pg.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.options("*", cors());

app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/rooms", require("./routes/roomRoutes"));

app.get("/", (req, res) => {
  res.send("API Running...");
});

console.log("JWT:", process.env.JWT_SECRET ? "LOADED" : "MISSING");

module.exports = app;
