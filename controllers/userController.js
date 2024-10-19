const User = require('../models/userModel');

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({

      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      auctions: user.auctions,
      bids: user.bids
    });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching user profile', error });
  }
};

exports.updateUserProfile = async (req, res) => {
  const { firstName, lastName, email } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.user.id, { firstName, lastName, email }, { new: true });
    res.status(200).json({
      message: "Profile update was successful"
    });
  } catch (error) {
    res.status(400).json({ message: 'Error updating user profile', error });
  }
};





