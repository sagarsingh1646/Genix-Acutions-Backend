const User = require("../models/userModel");
const jwt = require("../utils/jwtUtils");
const DeviceToken = require("../models/deviceTokenModel");

// User registration (Signup)
exports.signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
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
    console.error("Error creating user:", error);
    res.status(400).json({ message: "Error creating user" });
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
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the entered password with the hashed password in the DB
    const isMatch = await user.comparePassword(password);

    // If password doesn't match
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token for the logged-in user
    const token = jwt.createToken(user);

    res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error logging in" });
  }
};

exports.saveFcmToken = async (req, res) => {
  const { token, email } = req.body;

  if (!token) {
    return res.status(400).json({ message: "FCM token is required" });
  }

  try {
    // Check if the email already exists
    const user = await User.findOne({ email });

    const userId = user._id;

    // Check if the token already exists for this user
    let existingToken = await DeviceToken.findOne({ user: userId, token });

    if (existingToken) {
      return res.status(200).json({ message: "Token already exists" });
    }

    const newToken = new DeviceToken({ user: userId, token });
    await newToken.save();

    return res.status(200).json({ message: "Token saved successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
