const User = require('../models/userModel');  // Ensure the path to the user model is correct
const jwt = require('../utils/jwtUtils');  // Ensure jwtUtils is correctly imported
const bcrypt = require('bcryptjs');  // If you are using bcrypt for hashing passwords

// User registration (Signup)
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if the email or username already exists
    const existingUser = await User.findOne({
        $or: [
          { email: email },
          { username: username }
        ]
      });
    if (existingUser) {
      return res.status(400).json({ message: 'Email or Username already in use' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 8);
    console.log("signup-hash:", hashedPassword);

    // Create a new user
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Generate a JWT token for the user after successful registration
    const token = jwt.createToken(user);

    res.status(201).json({ token });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ message: 'Error creating user' });
  }
};

// User login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // If user doesn't exist
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the entered password with the hashed password in the DB
    const isMatch = await bcrypt.compare(password, user.password);  // Don't hash the password again, just compare
    console.log("isMatch:", isMatch);

    // If password doesn't match
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token for the logged-in user
    const token = jwt.createToken(user);

    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
};
