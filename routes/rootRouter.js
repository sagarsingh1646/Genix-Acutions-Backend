const express = require("express");
const router = express.Router();
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const auctionRoutes = require('./auctionRoutes')
const bidRoutes = require("./bidRoutes")

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/auctions', auctionRoutes);
router.use('/bids', bidRoutes);

module.exports = router
