const bcrypt = require("bcrypt");
const User = require("../models/UserModel.js");
const Profile = require("../models/ProfileModel");
const generateToken = require("../util/generateToken.js");

exports.loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }
  const isUser = await bcrypt.compare(password, user.password);
  if (!isUser) {
    return res.status(401).json({ message: "Wrong Credentials" });
  }

  const token = generateToken(user.id);
  const profile = await Profile.findOne({ user_id: user._id });
  let isProfile = false;
  if (profile) isProfile = true;
  return res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    isProfile: isProfile,
    token: token,
  });
};

exports.registerController = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(401).json({ message: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  User.create(
    {
      name,
      email,
      password: hashedPassword,
    },
    (err, user) => {
      if (err) {
        return res.status(500).json({ message: `${err}` });
      }
      if (user) {
        const token = generateToken(user._id);
        return res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          isTeacher: user.isTeacher,
          token: token,
        });
      } else {
        return res.status(400).json({ message: "Invalid user data" });
      }
    }
  );
};

exports.profileController = async (req, res) => {
  const { location, latitude, longitude, user_id, fav_genre } = req.body;
  const profile = await Profile.findOne({ user_id });
  if (profile) {
    return res.status(401).json({ message: "Profile already exists" });
  }
  console.log(location, latitude, longitude, user_id, fav_genre);
  Profile.create(
    {
      location,
      latitude,
      longitude,
      user_id,
      fav_genre,
    },
    (err, profile) => {
      if (err) {
        return res.status(500).json({ message: `${err}` });
      }
      if (profile) {
        return res.status(201).json({
          profile,
        });
      } else {
        return res.status(400).json({ message: "Invalid Profile data" });
      }
    }
  );
};
