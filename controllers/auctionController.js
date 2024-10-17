const Auction = require("../models/auctionModel");
const User = require('../models/userModel'); // Import the User model

// Create a new auction
exports.createAuction = async (req, res) => {
  try {
    const { title, description, startingBid, endDate } = req.body;

    // Check if all required fields are present
    if (!title || !startingBid || !endDate) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    const auction = new Auction({
      title,
      description,
      startingBid,
      currentBid: startingBid, // Initialize current bid with starting bid
      endDate,
      owner: req.user.id, // Attach the logged-in user as the owner
    });

    await auction.save();

    // Add the auction ID to the user's auctions array
    await User.findByIdAndUpdate(
      req.user.id, // The ID of the user
      { $push: { auctions: auction._id } }, // Add auction ID to auctions
      { new: true } // Return the updated user
    );

    res.status(201).json({ message: "Auction created successfully", auction });
  } catch (error) {
    console.error('Error creating auction:', error);
    res.status(500).json({ message: "Error creating auction", error: error.message });
  }
};

// Get all auctions
exports.getAllAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find().sort({ createdAt: -1 }); // Get latest auctions first
    res.status(200).json(auctions);
  } catch (error) {
    console.error('Error fetching auctions:', error);
    res.status(500).json({ message: "Error fetching auctions", error: error.message });
  }
};

// Get auction by ID
exports.getAuctionById = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.auctionId);

    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    res.status(200).json(auction);
  } catch (error) {
    console.error('Error fetching auction:', error);
    res.status(500).json({ message: "Error fetching auction", error: error.message });
  }
};

// Update an auction
exports.updateAuction = async (req, res) => {
  try {
    const { title, description, startingBid, endDate } = req.body;
    const auction = await Auction.findById(req.params.auctionId);

    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    // Check if the auction belongs to the logged-in user
    if (auction.owner.toString() !== req.user.id) { // Corrected from 'seller' to 'owner'
      return res.status(403).json({ message: "Unauthorized to update this auction" });
    }

    // Update auction details
    if (title) auction.title = title;
    if (description) auction.description = description;
    if (startingBid) auction.startingBid = startingBid;
    if (endDate) auction.endDate = endDate;

    await auction.save();
    res.status(200).json({ message: "Auction updated successfully", auction });
  } catch (error) {
    console.error('Error updating auction:', error);
    res.status(500).json({ message: "Error updating auction", error: error.message });
  }
};

// Delete an auction
exports.deleteAuction = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.auctionId);

    if (!auction) {
      return res.status(404).json({ message: "Auction not found" });
    }

    // Check if the auction belongs to the logged-in user
    if (auction.owner.toString() !== req.user.id) { // Corrected from 'seller' to 'owner'
      return res.status(403).json({ message: "Unauthorized to delete this auction" });
    }

    // await auction.remove();
    await Auction.deleteOne({ _id: req.params.auctionId });
    res.status(200).json({ message: "Auction deleted successfully", auctionId: auction._id });
  } catch (error) {
    console.error('Error deleting auction:', error);
    res.status(500).json({ message: "Error deleting auction", error: error.message });
  }
};
