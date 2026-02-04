const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sharing: { type: String, required: true },
    rent: { type: String, required: true },
    availability: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ['available', 'limited', 'full'], default: 'available' },
    features: [String]
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);
