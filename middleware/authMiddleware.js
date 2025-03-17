// middleware/authMiddleware.js
const jwt = require('jwt-simple');
const dotenv = require('dotenv');

dotenv.config();

// Middleware to check if the user is authenticated
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

  if (!token) {
    return res.status(403).json({ message: 'Token is required' });
  }

  try {
    // Decode the token
    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;  // Attach userId to the request object
    next();  // Move to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = verifyToken;