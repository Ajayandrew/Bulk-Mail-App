const mongoose = require("mongoose");

const MailSchema = new mongoose.Schema({
  subject: String,
  body: String,
  sender: String,
  recipients: [String],
  status: String
}, { timestamps: true }); // ✅ REQUIRED for createdAt

module.exports = mongoose.model("Mail", MailSchema);