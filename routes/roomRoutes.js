const express = require("express");
const {
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom
} = require("../controllers/roomController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getRooms);
router.post("/", protect, createRoom);
router.put("/:id", protect, updateRoom);
router.delete("/:id", protect, deleteRoom);

module.exports = router;
