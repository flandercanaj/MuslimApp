const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

const User = require('../models/User');

const isAdmin = (req, res, next) => {
  // Assume you're checking a JWT or session for the user role
  const user = req.user; // `req.user` should come from some authentication middleware
  
  if (user && user.role === 'admin') {
    next();  // User is an admin, proceed to the route handler
  } else {
    return res.status(403).json({ message: 'Access denied' });
  }
};

module.exports = { isAdmin };

