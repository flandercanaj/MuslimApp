const express = require('express');
const bcrypt = require('bcryptjs'); // For password hashing
const User = require('../models/User'); // Assuming you have a User model for registration/login

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Check if the email is already in use
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }
  
      // Check if the email should be assigned as admin
      const adminEmails = ['admin@example.com', 'superadmin@example.com'];  // List of admin emails
      const role = adminEmails.includes(email) ? 'admin' : 'user';  // Assign role based on email
  
      // Create a new user
      const newUser = new User({
        username,
        email,
        password,
        role,  // Assign the role based on email
      });
  
      // Hash the password before saving
      await newUser.save();
  
      res.status(201).json({
        message: 'User registered successfully',
        user: newUser,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
  

  // POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if the password matches
    const isMatch = await user.isPasswordMatch(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if the user email is in the list of admin emails
    const adminEmails = ['admin@example.com', 'superadmin@example.com'];  // Add the specific emails that should have admin access
    if (adminEmails.includes(user.email)) {
      user.role = 'admin';  // Assign the admin role to these users dynamically
    } else {
      user.role = 'user';  // Default to user role if email is not an admin email
    }

    // Send back a response with the user details
    res.json({
      message: 'Login successful',
      user,
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

  
   
  

// Example route for fetching users (can be extended)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
