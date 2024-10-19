const express = require("express");
const router = express.Router();
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const auctionRoutes = require('./auctionRoutes')
const bidRoutes = require("./bidRoutes")

router.use('/auth', authRoutes); //All auth routes
router.use('/users', userRoutes); //Users routes
router.use('/auctions', auctionRoutes); //Auctions Routes
router.use('/bids', bidRoutes); //Bids route

module.exports = router
