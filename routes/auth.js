const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');  // 🔥 ADD THIS
const User = require('../models/User');
const router = express.Router();

router.post('/login', async (req, res) => {
    console.log('🔐 Login attempt:', req.body);
    
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password required' });
    }
    
    try {
        const user = await User.findOne({ username });
        console.log('User found:', user ? user.username : 'No');
        
        if (!user) {
            console.log('❌ User not found');
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        console.log('Stored hash:', user.password.substring(0, 20) + '...');
        console.log('Input password:', password);
        
        // 🔥 BCRYPT COMPARE - NEVER DECRYPT!
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match:', isMatch);
        
        if (!isMatch) {
            console.log('❌ Password mismatch');
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        const token = jwt.sign(
            { userId: user._id, username: user.username, role: user.role }, 
            'your-super-secret-key', 
            { expiresIn: '7d' }
        );
        
        console.log('✅ Login successful:', user.username);
        
        res.json({ 
            token, 
            user: { 
                id: user._id, 
                username: user.username, 
                role: user.role 
            } 
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports=router;