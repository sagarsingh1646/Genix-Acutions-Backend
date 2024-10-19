const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')

const rootRouter = require("./routes/rootRouter")


dotenv.config();
const app = express();
app.use(cors())
app.use(express.json());

//Connect DB
mongoose.connect(process.env.MONGO_URI, {}
).then(() => console.log('MongoDB connected')).catch(err => console.log(err));


//Current api version V1
app.use("/api/v1", rootRouter)


// Starting the server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

