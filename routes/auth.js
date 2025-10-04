const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// ----------------------
// Routes for authentication
// ----------------------

// Register
router.post('/register', register);

//Login
router.post('/login', login);

module.exports = router;
