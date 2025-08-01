// model/NewsletterEmail.js
import mongoose from "mongoose";

const newsletterEmailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("NewsletterEmail", newsletterEmailSchema);
