const bcrypt = require('bcrypt');

const saltRounds = 12;  // Number of rounds for salting

// Function to hash a password
exports.hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password');
  }
};

// Function to compare a plain password with a hashed password
exports.comparePassword = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error('Error comparing password');
  }
};
