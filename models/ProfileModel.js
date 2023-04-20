const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  location: {
    type: String,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fav_genre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Genre",
  },
  points: {
    type: Number,
    default: 0,
  },
});

const Profile = mongoose.model("Profile", ProfileSchema);
module.exports = Profile;
