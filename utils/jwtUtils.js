const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_SECRET;

// Function to create a JWT token
exports.createToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      username: user.email,
    },
    secret,
    { expiresIn: '1d' }  // Token valid for 1 day
  );
};

// Function to verify a JWT token
exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error('Invalid token');
  }
};
