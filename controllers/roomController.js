const Room = require("../models/Room");

// GET
exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: -1 });
    res.json(rooms);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// POST
exports.createRoom = async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.status(201).json(room);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE
exports.updateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!room)
      return res.status(404).json({ message: "Room not found" });

    res.json(room);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE
exports.deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);

    if (!room)
      return res.status(404).json({ message: "Room not found" });

    res.json({ message: "Room deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
