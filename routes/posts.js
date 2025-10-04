const express = require('express');

// Import comment controller functions
const {
  getAllPosts,
  getPostById,
  createPost,
  deletePostById,
  updatePostById,
} = require('../controllers/postController');

const router = express.Router();

// ----------------------
// Routes for posts
// ----------------------

// Get all posts
router.get('/', getAllPosts);

// Get a single post by ID
router.get('/:id', getPostById);

// Create a new post
router.post('/create', createPost);

// Delete a post by ID
router.delete('/:id', deletePostById);

// Update a post by ID
router.patch('/:id', updatePostById);

module.exports = router;
