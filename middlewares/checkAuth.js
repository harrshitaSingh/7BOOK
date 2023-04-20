const jwt = require("jsonwebtoken");
const User = require("../models/UserModel.js");
module.exports = protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = await User.findOne({ _id: decoded.id }).select("-password");
    next();
  } catch (err) {
    if (err) {
      console.log(err);
      return res.status(401).json({ message: "Not Authorized" });
    }
  }
};
