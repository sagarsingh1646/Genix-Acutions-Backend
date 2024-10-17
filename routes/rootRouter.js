const express = require("express");
const router = express.Router();
// const authRoutes = require('./routes/authRoutes');
// const userRoutes = require('./routes/userRoutes');

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

module.exports = router
