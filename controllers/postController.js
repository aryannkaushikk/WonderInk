const mongoose = require("mongoose");
const Post = require("../models/posts");

// Get all posts
async function getAllPosts(req, res) {
  try {
    const posts = await Post.find()
      .populate("author", "name")
      .sort({ createdAt: -1 });
    res.json({ success: true, data: posts });
  } catch (error) {
    console.log("Error Fetching All Posts:", error);
    res.status(500).json({ success: false, message: "Failed to fetch posts" });
  }
}

// Get a single post by ID
async function getPostById(req, res) {
  try {
    const id = req.params.id;
    const post = await Post.findById(id).populate("author", "name");
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    res.json({ success: true, data: post });
  } catch (error) {
    console.log("Error Fetching Posts:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch this post" });
  }
}

// Create a new post
async function createPost(req, res) {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    console.log("Error Saving this Post:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to save this post" });
  }
}

// Update a post by ID
async function updatePostById(req, res) {
  try {
    const id = req.params.id;
    const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate("author", "name");
    if (!updatedPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    res.json({ success: true, data: updatedPost });
  } catch (error) {
    console.log("Error Updating Post:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update this post" });
  }
}

// Delete a post by ID
async function deletePostById(req, res) {
  try {
    const id = req.params.id;
    const deletedPost = await Post.findByIdAndDelete(id).populate(
      "author",
      "name"
    );
    if (!deletedPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    res.json({ success: true, data: deletedPost });
  } catch (error) {
    console.log("Error Deleting Post:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete this post" });
  }
}

// Export all controller functions
module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePostById,
  deletePostById,
};
