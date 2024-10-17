const express = require('express');
const router = express.Router();
const { placeBid, getBidsForAuction } = require('../controllers/bidController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, placeBid);
router.get('/:auctionId', getBidsForAuction);

module.exports = router;
