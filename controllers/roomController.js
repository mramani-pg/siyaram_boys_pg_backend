const express = require("express");
const Room = require("../models/Room");
const auth = require("../middleware/authMiddleware");

exports.getRooms =async (req, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: -1 });
    res.json(rooms);
  } catch (error){
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createRoom= async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.json(room);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateRoom= async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.json(room);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.json({ message: "Room deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};


