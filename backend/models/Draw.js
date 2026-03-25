const mongoose = require("mongoose");

const drawSchema = new mongoose.Schema({
  numbers: [Number],
  date: Date
});

module.exports = mongoose.model("Draw", drawSchema);