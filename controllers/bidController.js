// const Bid = require('../models/bidModel');
// const Auction = require("../models/auctionModel");
// const User = require("../models/userModel"); 

const Bid = require('../models/bidModel');
const Auction = require("../models/auctionModel");
const User = require("../models/userModel");
const DeviceToken = require('../models/deviceTokenModel');
const { sendNotificationToDevice } = require('../utils/notificationService'); 

// exports.placeBid = async (req, res) => {
//   const { auctionId, bidAmount } = req.body;

//   try {
//     const auction = await Auction.findById(auctionId);
    
//     // Ensure the auction exists
//     if (!auction) {
//       return res.status(404).json({
//         message: "Auction not found",
//       });
//     }

//     // Check if the new bid is higher than the current highest bid
//     if (auction.currentBid >= bidAmount) {
//       return res.status(400).json({
//         message: "Bid must be higher than the current highest bid",
//       });
//     }

//     // Create the new bid
//     const bid = new Bid({
//       amount: bidAmount,
//       bidder: req.user.id,
//       auction: auctionId,
//     });

//     await bid.save();

//     // Update the auction's bid list and current highest bid
//     auction.bids.push(bid._id);
//     auction.currentBid = bidAmount;
//     await auction.save(); // Save the updated auction

//     // Update the user's bid list
//     await User.findByIdAndUpdate(
//       req.user.id,
//       { $push: { bids: bid._id } }, // Add the bid ID to the user's bids
//       { new: true } // Return the updated user document
//     );

//     res.status(201).json({
//       message: "Bid placed successfully",
//       bid,
//     });

//   } catch (error) {
//     res.status(400).json({
//       message: "Error placing bid",
//       error: error.message,
//     });
//   }
// };



exports.placeBid = async (req, res) => {
  const { auctionId, bidAmount } = req.body;

  try {
    const auction = await Auction.findById(auctionId).populate('bids');

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

    // Send notifications in the background
    sendBidNotifications(auctionId, req.user.id, bidAmount, auction.title);

    // Respond with success even if notification sending fails
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

// Separate function to handle sending notifications
const sendBidNotifications = async (auctionId, currentBidderId, bidAmount, auctionTitle) => {
  try {
    // Retrieve all previous bidders except the current one
    const previousBidders = await Bid.find({
      auction: auctionId,
      bidder: { $ne: currentBidderId }, // Exclude the current bidder
    }).distinct('bidder'); // Get unique user IDs of previous bidders



    // Fetch device tokens of previous bidders
    const deviceTokens = await DeviceToken.find({
      user: { $in: previousBidders }
    });

    // Prepare notification payload
    const notificationPayload = {
      title: `New bid on ${auctionTitle}`,
      body: `A new bid of $${bidAmount} has been placed!`,
    };

    // Send notifications to all previous bidders except the current one
    const notificationPromises = deviceTokens.map(token => {
      return sendNotificationToDevice(token.token, notificationPayload);
    });

    await Promise.all(notificationPromises); 
    console.log('Notifications sent successfully.');
  } catch (error) {
    // Log notification errors
    console.error('Error sending notifications:', error);
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
  