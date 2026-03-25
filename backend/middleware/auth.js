const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) return res.sendStatus(401);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 fetch full user
    const user = await User.findById(decoded.id).select("-password");

    if (!user) return res.sendStatus(404);

    req.user = user; // ✅ full user now

    next();

  } catch (err) {
    console.error(err);
    return res.sendStatus(401);
  }
};