const User = require('../models/User');  // Path to your User model

// Register a new user
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields (username, email, password) are required' });
  }

  try {
    // Create a new user instance
    const user = new User({
      username,
      email,
      password,  // The password will be hashed in the model before saving
    });

    // Save the user
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
