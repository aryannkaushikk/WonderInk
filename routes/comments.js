const express = require('express');
const router = express.Router();

// Import comment controller functions
const {
  getCommentsByPost,
  createComment,
  updateCommentById,
  deleteCommentById
} = require('../controllers/commentController');

// ----------------------
// Routes for comments
// ----------------------

// Get all comments for a specific post
router.get('/post/:postId', getCommentsByPost);

// Create a new comment
router.post('/', createComment);

// Update a comment by ID
router.patch('/:id', updateCommentById);

// Delete a comment by ID
router.delete('/:id', deleteCommentById);

module.exports = router;