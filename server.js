const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const authRoutes = require('./routes/authRoutes');
// const userRoutes = require('./routes/userRoutes');
const rootRouter = require("./routes/rootRouter")

// const auctionRoutes = require('./routes/auctionRoutes');
// const bidRoutes = require('./routes/bidRoutes');

dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

// Routes
app.use("/api/v1", rootRouter)
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/auctions', auctionRoutes);
// app.use('/api/bids', bidRoutes);

// Starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

