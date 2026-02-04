const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true
}));
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('❌ MONGO_URI not found in .env');
    process.exit(1);
}

console.log('🔍 URI preview:', MONGO_URI?.replace(/:(.*?)@/, ':***@'));



mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log('✅ MongoDB Connected');
        
        const User = require('./models/User');
        
        // 🔥 DELETE OLD + CREATE PLAIN TEXT ADMIN (⚠️ Remove in production!)
        await User.deleteOne({ username: '7878755058' });
        
        await new User({
            username: '7878755058',
            password: 'Mayur@7878',  
            role: 'admin'
        }).save();
    })
    .catch(err => {
        console.log('❌ MongoDB Error:', err);
        process.exit(1);
    });

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/rooms', require('./routes/rooms'));

module.exports = app;