const jwt = require("jsonwebtoken");

module.exports = (req,res,next)=>{
  const token = req.headers.authorization;
  if(!token) return res.sendStatus(401);

  const decoded = jwt.verify(token,process.env.JWT_SECRET);
  req.user = decoded;
  next();
};