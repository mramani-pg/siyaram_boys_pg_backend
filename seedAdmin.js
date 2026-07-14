const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("./config/db");
const User = require("./models/User");

const seedAdmin = async () => {
  try {
    await connectDB();

    const existingUser = await User.findOne({
      username: "7878755058",
    });

    if (existingUser) {
      console.log("Admin user already exists.");
      process.exit(0);
    }

    const admin = new User({
      username: "7878755058",
      password: "Mayur@7878",
      role: "admin",
    });

    await admin.save();

    console.log("Admin user created successfully.");
    console.log("Username: 7878755058");
    console.log("Password: Mayur@7878");

    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
};

seedAdmin();
