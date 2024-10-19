const User = require('../models/userModel'); 
const jwt = require('../utils/jwtUtils'); 

// User registration (Signup)
exports.signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Create a new user
    const user = new User({
      firstName,
      lastName,
      email,
      password,  
    });

    // Save the user to the database
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
    // Check if the email already exists
    const user = await User.findOne({ email });

    

    // If user doesn't exist
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the entered password with the hashed password in the DB
    const isMatch = await user.comparePassword(password);  

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
