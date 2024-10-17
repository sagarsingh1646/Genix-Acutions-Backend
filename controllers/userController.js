const User = require('../models/userModel');

exports.getUserProfile = async (req, res) => {
  try {
    console.log("getUserProfile:",req.user.id)
    // const user = await User.findById(req.user.id).populate('auctions bids');
    const user = await User.findById(req.user.id);
    res.status(200).json({
      username: user.username,
      email: user.email,
      auctions: user.auctions,
      bids: user.bids
    });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching user profile', error });
  }
};

exports.updateUserProfile = async (req, res) => {
  const { username, email } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.user.id, { username, email }, { new: true });
    res.status(200).json({
      message: "Profile update was successful"
    });
  } catch (error) {
    res.status(400).json({ message: 'Error updating user profile', error });
  }
};

exports.checkUsername = async (req, res) => {
  try {
    // Extract username from query parameters
    const username = req.query.username || "";
    console.log("username:", username);

    // Simple validation for username
    if (username === "") {
      return res.status(400).json({
        success: false,
        message: 'Invalid query parameters: username is required',
      });
    }

    // Check if the username is already taken
    const existingVerifiedUser = await User.findOne({ username });

    if (existingVerifiedUser) {
      return res.status(400).json({
        success: false,
        message: 'Username is already taken',
      });
    }

    // If not taken, return success
    res.status(200).json({
      success: true,
      message: 'Username is unique',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error checking username',
      error,
    });
  }
};


