const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  value: Number,
  date: Date
});

module.exports = mongoose.model("Score", scoreSchema);