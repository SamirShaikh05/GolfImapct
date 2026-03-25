const router = require("express").Router();
const auth = require("../middleware/auth");
const Score = require("../models/Score");

// add score
router.post("/score", auth, async (req,res)=>{
  const {value} = req.body;

  const scores = await Score.find({userId:req.user.id}).sort({date:1});

  if(scores.length >= 5){
    await Score.findByIdAndDelete(scores[0]._id);
  }

  const newScore = await Score.create({
    userId:req.user.id,
    value,
    date:new Date()
  });

  res.json(newScore);
});

// get scores
router.get("/scores", auth, async (req,res)=>{
  const scores = await Score.find({userId:req.user.id}).sort({date:-1});
  res.json(scores);
});

module.exports = router;