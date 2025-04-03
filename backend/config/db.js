require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.DATABASE_URL;

if (!uri) {
  console.error("MongoDB URI is missing. Set DATABASE_URL in environment variables.");
  process.exit(1);
}

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));
