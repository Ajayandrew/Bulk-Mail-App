const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(cors({origin:'https://bulk-mail-app-y49e.vercel.app'}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const mailRoutes = require("./routes/mailRoutes");
app.use("/api/mail", mailRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));