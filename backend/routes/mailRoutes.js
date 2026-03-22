const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Mail = require("../models/Mail");

router.post("/send", async (req, res) => {
  const { subject, body, sender, emailList } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: sender,
        pass: process.env.PASSWORD
      }
    });

    for (let email of emailList) {
      await transporter.sendMail({
        from: sender,
        to: email,
        subject: subject,
        text: body
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
    console.log(err);

    await Mail.create({
      subject,
      body,
      sender,
      recipients: emailList,
      status: "Failed"
    });

    res.status(500).json({ success: false });
  }
});

// history
router.get("/history", async (req, res) => {
  const data = await Mail.find().sort({ createdAt: -1 });
  res.json(data);
});

module.exports = router;