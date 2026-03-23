const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(cors({origin: '*'}));
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Error:", err));

// ✅ Routes
const mailRoutes = require("./routes/mailRoutes");
app.use("/api/mail", mailRoutes);

// ✅ Server
app.listen(5000, () => console.log("Server running on port 5000"));