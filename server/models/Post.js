// server/models/Post.js
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    content: {
      type: String,
      required: true,
      minlength: 10,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // existing user model
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
