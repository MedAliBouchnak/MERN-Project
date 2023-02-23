const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostsModel = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  title: {
    type: "String",
    required: true,
  },
  message: {
    type: "String",
    required: true,
  },
  img: {
    type: "String",
    required: true,
  },
  creator: "String",
  tags: ["String"],
  selectedFile: "String",
  likeCount: {
    type: "Number",
    default: 0,
  },
  createdAt: {
    type: "Date",
    default: new Date(),
  },
});

module.exports = mongoose.model("Posts", PostsModel);
