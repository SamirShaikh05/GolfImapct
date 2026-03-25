const router = require("express").Router();
const Draw = require("../models/Draw");
const Score = require("../models/Score");
const Winner = require("../models/Winner");

// generate draw
router.post("/draw", async (req,res)=>{
  const numbers = Array.from({length:5}, ()=> Math.floor(Math.random()*45)+1);

  const draw = await Draw.create({numbers, date:new Date()});

  const scores = await Score.find();

  for(let s of scores){
    let matches = numbers.includes(s.value) ? 1 : 0;

    if(matches >= 3){
      await Winner.create({
        userId: s.userId,
        matchType: matches,
        amount: matches*100
      });
    }
  }

  res.json(draw);
});

module.exports = router;