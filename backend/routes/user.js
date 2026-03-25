const router = require("express").Router();
const auth = require("../middleware/auth");

const Score = require("../models/Score");
const User = require("../models/User");
const Winner = require("../models/Winner");


// =======================
// 📊 SCORES
// =======================

// Add score (max 5)
router.post("/score", auth, async (req, res) => {
  try {
    const { value } = req.body;

    if (!value) {
      return res.status(400).json({ msg: "Score value required" });
    }

    const scores = await Score.find({ userId: req.user.id }).sort({ date: 1 });

    // keep only last 5 scores
    if (scores.length >= 5) {
      await Score.findByIdAndDelete(scores[0]._id);
    }

    const newScore = await Score.create({
      userId: req.user.id,
      value: Number(value),
      date: new Date()
    });

    res.json(newScore);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error adding score" });
  }
});


// Get user scores
router.get("/scores", auth, async (req, res) => {
  try {
    const scores = await Score.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(scores);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching scores" });
  }
});


// =======================
// 👤 USER
// =======================

// Get current user
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching user" });
  }
});


// Activate subscription
router.post("/activate-subscription", auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        isSubscribed: true,
        subscriptionType: "monthly"
      },
      { new: true }
    );

    res.json({
      msg: "Subscription activated",
      user
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error activating subscription" });
  }
});


// =======================
// 🏆 REWARDS
// =======================

// Get user rewards
router.get("/my-rewards", auth, async (req, res) => {
  try {
    const rewards = await Winner.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.json(rewards);

  } catch (err) {
    res.status(500).json({ msg: "Error fetching rewards" });
  }
});


// Claim reward
router.post("/claim/:id", auth, async (req, res) => {
  try {
    const reward = await Winner.findById(req.params.id);

    if (!reward) {
      return res.status(404).json({ msg: "Reward not found" });
    }

    // Check ownership
    if (reward.userId.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    // Already claimed
    if (reward.status === "claimed") {
      return res.status(400).json({ msg: "Already claimed" });
    }

    reward.status = "claimed";
    await reward.save();

    res.json({
      msg: "Reward claimed successfully",
      reward
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error claiming reward" });
  }
});


module.exports = router;