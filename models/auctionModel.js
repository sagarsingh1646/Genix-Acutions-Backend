const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageLink: {type: String},
  startingBid: { type: Number, required: true },
  currentBid: { type: Number, default: 0 },
  endDate: { type: Date, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bid' }],
}, { timestamps: true });

module.exports = mongoose.model('Auction', auctionSchema);
