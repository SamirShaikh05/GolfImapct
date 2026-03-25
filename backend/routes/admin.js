const router = require("express").Router();
const Draw = require("../models/Draw");
const Score = require("../models/Score");
const Winner = require("../models/Winner");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// generate draw
router.post("/draw", auth, admin, async (req, res) => {
  try {
    const numbersSet = new Set();
    while (numbersSet.size < 5) {
      numbersSet.add(Math.floor(Math.random() * 45) + 1);
    }
    const numbers = Array.from(numbersSet);

    console.log("Draw numbers:", numbers);

    const draw = await Draw.create({ numbers, date: new Date() });

    const scores = await Score.find();

    console.log("Total scores:", scores.length);

    if (scores.length === 0) {
      return res.json({ msg: "No scores available", draw });
    }

    let winners = [];
    const seenUsers = new Set();

    for (let s of scores) {
      const scoreValue = Number(s.value);

      if (
        numbers.includes(scoreValue) &&
        !seenUsers.has(s.userId.toString())
      ) {
        const winner = await Winner.create({
          userId: s.userId,
          matchType: 1,
          amount: 100,
          status: "pending",
          drawId: draw._id // 🔥 important improvement
        });

        winners.push(winner); // ✅ FIX

        seenUsers.add(s.userId.toString());
      }
    }

    console.log("Winners created:", winners.length);

    res.json({
      msg: "Draw completed",
      draw,
      winnersCount: winners.length,
      winners
    });

  } catch (err) {
    console.error("DRAW ERROR:", err);
    res.status(500).json({ msg: "Draw failed" });
  }
});

module.exports = router;