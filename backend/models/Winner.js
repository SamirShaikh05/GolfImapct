const mongoose = require("mongoose");

const winnerSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  matchType: Number,
  amount: Number,
  status: { type: String, default: "pending" }
});

module.exports = mongoose.model("Winner", winnerSchema);