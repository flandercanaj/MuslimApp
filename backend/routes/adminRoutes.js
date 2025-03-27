const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { isAdmin } = require('../middleware/authMiddleware'); // Middleware for checking admin status

// Get all users (admin only)
router.get('/users', isAdmin, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users); // Sending the users as JSON response
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error: error.message });
  }
});

module.exports = router;
