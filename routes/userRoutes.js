const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/me', authMiddleware, getUserProfile); 
router.put('/me', authMiddleware, updateUserProfile);


module.exports = router;
