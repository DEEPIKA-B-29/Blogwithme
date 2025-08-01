// routes/newsletter.js
import express from "express";
import NewsletterEmail from "../model/NewsletterEmail.js"; // model for email collection

const router = express.Router();

router.post("/subscribe", async (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes("@")) {
    return res.status(400).json({ message: "Invalid email address." });
  }

  try {
    const existing = await NewsletterEmail.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already subscribed." });
    }

    await NewsletterEmail.create({ email });
    res.status(200).json({ message: "Subscribed successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

export default router;
