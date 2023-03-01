const mongoose = require("mongoose");
const ValidateBlog = require("../Validation/Post");
const PostsModel = require("../Models/PostsModel");

const AddBlog = async (req, res) => {
  const { errors, isValid } = ValidateBlog(req.body);

  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      const user_id = req.user._id;
      req.body.user = user_id;
      const blog = await PostsModel.create(req.body);
      res.status(201).json(blog);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const UpdateBlog = async (req, res) => {
  const { errors, isValid } = ValidateBlog(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      const blog = await PostsModel.findById(req.params.id);
      if (!blog) {
        return res
          .status(400)
          .json({ error: "No such blog found or not authorized to update" });
      }

      const updatedBlog = await PostsModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      res.status(201).json(updatedBlog);
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const FindAllBlogs = async (req, res) => {
  try {
    const data = await PostsModel.find()
      .populate("user", ["name", "role"])
      .sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
const FindAllBlogsByUserId = async (req, res) => {
  try {
    const data = await PostsModel.findById({ user: req.user.id })
      .populate("user", ["name", "role"])
      .sort({ createdAt: -1 });
    if (!data) {
      return res.status(404).json({ error: "No such Blogs" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const FindSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such blog" });
    }
    const data = await PostsModel.findById(id).populate("user", [
      "name",
      "role",
    ]);
    if (!data) {
      return res.status(404).json({ error: "No such Blog" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const DeleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such blog" });
    }
    const blog = await PostsModel.findOne({ _id: id });
    if (!blog) {
      return res.status(400).json({ error: "No such blog found" });
    }
    await PostsModel.findOneAndRemove({ _id: id });

    res.status(200).json({ success: "Blog removed successfully" });
  } catch (error) {
    res.status(404).json(error.message);
  }
};
const LikeBlog = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const post = await PostsModel.findById(id);
  const updatedPost = await PostsModel.findByIdAndUpdate(
    id,
    { likeCount: post.likeCount + 1 },
    { new: true }
  );
  if (!updatedPost) {
    return res.status(404).send(`No post with id: ${id}`);
  }
  res.json(updatedPost);
};
module.exports = {
  AddBlog,
  FindAllBlogs,
  UpdateBlog,
  FindSingleBlog,
  FindAllBlogsByUserId,
  DeleteBlog,
  LikeBlog,
};
