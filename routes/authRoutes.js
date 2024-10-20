const express = require('express');
const router = express.Router();
const { signup, login, saveFcmToken } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.post('/save-fcm-token', saveFcmToken); // to save FCM Device token

module.exports = router;
