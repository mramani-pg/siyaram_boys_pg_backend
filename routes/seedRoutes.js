const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const existing = await User.findOne({
      username: "7878755058",
    });

    if (existing) {
      return res.json({ message: "Admin already exists" });
    }

    const admin = new User({
      username: "7878755058",
      password: "Mayur@7878",
      role: "admin",
    });

    await admin.save();

    res.json({ message: "Admin created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
