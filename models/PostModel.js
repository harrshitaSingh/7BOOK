const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    bookTitle: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Genre",
      },
    ],
    interest: {
      type: String,
    },
    imageUri: {
      type: String,
    },
  },

  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
