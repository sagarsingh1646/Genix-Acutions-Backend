const Bid = require('../models/bidModel');
const Auction = require("../models/auctionModel");
const User = require("../models/userModel"); // Ensure the User model is imported

exports.placeBid = async (req, res) => {
  const { auctionId, bidAmount } = req.body;

  try {
    const auction = await Auction.findById(auctionId);
    
    // Ensure the auction exists
    if (!auction) {
      return res.status(404).json({
        message: "Auction not found",
      });
    }

    // Check if the new bid is higher than the current highest bid
    if (auction.currentBid >= bidAmount) {
      return res.status(400).json({
        message: "Bid must be higher than the current highest bid",
      });
    }

    // Create the new bid
    const bid = new Bid({
      amount: bidAmount,
      bidder: req.user.id,
      auction: auctionId,
    });

    await bid.save();

    // Update the auction's bid list and current highest bid
    auction.bids.push(bid._id);
    auction.currentBid = bidAmount;
    await auction.save(); // Save the updated auction

    // Update the user's bid list
    await User.findByIdAndUpdate(
      req.user.id,
      { $push: { bids: bid._id } }, // Add the bid ID to the user's bids
      { new: true } // Return the updated user document
    );

    res.status(201).json({
      message: "Bid placed successfully",
      bid,
    });

  } catch (error) {
    res.status(400).json({
      message: "Error placing bid",
      error: error.message,
    });
  }
};


exports.getBidsForAuction = async (req, res) => {
  try{
    const bids = await Bid.find({auction: req.params.auctionId})
    .populate('bidder', 'firstName')
    .sort({createdAt: -1});

    res.status(200).json(bids)
  } catch(error){
    res.status(400).json({
      message: "Error fetching bids", error
    })
  }

}
  