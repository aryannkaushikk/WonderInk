const mongoose = require("mongoose");
const Comment = require("../models/Comment");

// Get all comments for a post
async function getCommentsByPost(req, res) {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ post: postId })
      .populate("author", "name")
      .populate("post", "title")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch comments" });
  }
}

// // Get a single comment by ID
// async function getCommentById(req, res) {
//   try {
//     const id = req.params.id;
//     const comment = await Comment.findById(id)
//       .populate("author", "name")
//       .populate("post", "title");

//     if (!comment) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Comment not found" });
//     }

//     res.json({ success: true, data: comment });
//   } catch (error) {
//     console.error("Error fetching comment:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to fetch comment" });
//   }
// }

// Create a new comment
async function createComment(req, res) {
  try {
    const newComment = new Comment(req.body);
    await newComment.save();

    const populatedComment = await Comment.findById(newComment._id)
      .populate("author", "name")
      .populate("post", "title");

    res.status(201).json({ success: true, data: populatedComment });
  } catch (error) {
    console.error("Error creating comment:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to create comment" });
  }
}

// Update a comment by ID
async function updateCommentById(req, res) {
  try {
    const id = req.params.id;
    const updatedComment = await Comment.findByIdAndUpdate(id, req.body, {
      new: true,
    })
      .populate("author", "name")
      .populate("post", "title");

    if (!updatedComment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    res.json({ success: true, data: updatedComment });
  } catch (error) {
    console.error("Error updating comment:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update comment" });
  }
}

// Delete a comment by ID
async function deleteCommentById(req, res) {
  try {
    const id = req.params.id;
    const deletedComment = await Comment.findByIdAndDelete(id)
      .populate("author", "name")
      .populate("post", "title");

    if (!deletedComment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    res.json({ success: true, data: deletedComment });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete comment" });
  }
}

// Export all controller functions
module.exports = {
  getCommentsByPost,
  createComment,
  updateCommentById,
  deleteCommentById,
};
