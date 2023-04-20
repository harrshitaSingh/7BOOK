const jwt = require("jsonwebtoken");
const User = require("../models/UserModel.js");
const Profile = require("../models/ProfileModel");

module.exports = isAuth = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ isAuth: false });
      } else {
        const user = await User.findOne({ _id: decoded.id });
        if (user) {
          const profile = await Profile.findOne({ user_id: user._id });
          let isProfile = false;
          if (profile) isProfile = true;
          return res.status(201).json({ isAuth: true, isProfile: isProfile });
        } else {
          return res.status(401).json({ isAuth: false });
        }
      }
    });
  } catch (err) {
    res.status(500).json({ isAuth: false, message: "An error Occured" });
  }
};
