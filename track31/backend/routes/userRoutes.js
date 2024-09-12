const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming User is your Mongoose model
const router = express.Router();
const Expense = require('../models/Expense');
// Define your JWT secret (use environment variables in production)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Route for user signup
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password and create the user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });

    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

// Route for user login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials: username not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch); // Add this line to see the result of comparison

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials: incorrect password' });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token, username: user.username });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});


  


module.exports = router;