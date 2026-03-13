// server/controllers/postController.js
const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const post = await Post.create({
      title,
      content,
      author: req.user._id, // from protect middleware
    });

    res.status(201).json({
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    console.error("createPost error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getPosts = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 10;

    const skip = (page - 1) * limit;

    const filter = { author: req.user._id };

    const [posts, total] = await Promise.all([
      Post.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Post.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    res.json({
      data: posts,
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    });
  } catch (error) {
    console.error("getPosts error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
