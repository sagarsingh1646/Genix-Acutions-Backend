const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, checkUsername } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/me', authMiddleware, getUserProfile);
router.put('/me', authMiddleware, updateUserProfile);
router.get('/check-username', checkUsername)

module.exports = router;
