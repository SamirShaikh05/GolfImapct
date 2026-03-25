const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isSubscribed: { type: Boolean, default: false },
  subscriptionType: String,
  charity: String,
  charityPercentage: { type: Number, default: 10 },
  role: { type: String, default: "user" }
});

module.exports = mongoose.model("User", userSchema);