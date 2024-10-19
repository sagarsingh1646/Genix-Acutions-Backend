const express = require('express');
const router = express.Router();
const {
  createAuction,
  getAllAuctions,
  getAuctionById,
  updateAuction,
  deleteAuction,
} = require('../controllers/auctionController');  

const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, createAuction);     // Create a new auction
router.get('/', getAllAuctions);                    // Get all auctions
router.get('/:auctionId', getAuctionById);          // Get a specific auction by ID
router.put('/:auctionId', authMiddleware, updateAuction);  // Update auction by ID
router.delete('/:auctionId', authMiddleware, deleteAuction);  // Delete auction by ID

module.exports = router;
