const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Mail = require("../models/Mail");

router.post("/send", async (req, res) => {
  const { subject, body, sender, emailList } = req.body;

  if (!emailList || !Array.isArray(emailList)) {
    return res.status(400).json({ error: "Invalid email list" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,      // ✅ FIXED
        pass: process.env.PASSWORD
      }
    });

    for (let email of emailList) {
      await transporter.sendMail({
        from: `"${sender}" <${process.env.EMAIL}>`, // ✅ FIXED
        to: email,
        subject,
        text: body,
        replyTo: sender
      });
    }

    await Mail.create({
      subject,
      body,
      sender,
      recipients: emailList,
      status: "Sent"
    });

    res.json({ success: true });

  } catch (err) {
    console.log("Mail Error:", err.message);

    try {
      await Mail.create({
        subject,
        body,
        sender,
        recipients: emailList,
        status: "Failed"
      });
    } catch (dbErr) {
      console.log("DB Error:", dbErr.message);
    }

    res.status(500).json({ success: false, error: err.message });
  }
});

// HISTORY
router.get("/history", async (req, res) => {
  try {
    const data = await Mail.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    console.log("History Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;