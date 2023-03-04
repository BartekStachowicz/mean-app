const mongoose = require("mongoose");

const post = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  path: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
});

module.exports = mongoose.model("Post", post);
