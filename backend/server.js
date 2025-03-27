// In server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const University = require('./models/University'); // Ensure this model exists
const app = express();

app.use(cors());
app.use(express.json());

// Handle adding a new university
app.post('/api/universities/add', async (req, res) => {
  const { name, city } = req.body;

  try {
    const newUniversity = new University({ name, city });
    await newUniversity.save();
    res.status(201).json(newUniversity);  // Respond with the added university
  } catch (error) {
    console.error('Error adding university:', error);
    res.status(500).json({ message: 'Failed to add university' });
  }
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/MuslimWeb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Database connected successfully'))
  .catch((error) => console.log('Database connection error:', error));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
