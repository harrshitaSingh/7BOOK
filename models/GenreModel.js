const mongoose = require("mongoose");

const GenreSchema = new mongoose.Schema({
  name: [
    {
      type: String,
    },
  ],
});

const Genre = mongoose.model("Genre", GenreSchema);
module.exports = Genre;
