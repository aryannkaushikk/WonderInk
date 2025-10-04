const User = require('../models/users');
const bcrypt = require('bcryptjs');

// Register a new user
async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    console.log("Error registering user:", error);
    res.status(500).json({ success: false, message: "Failed to register user" });
  }
}

// Login user
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Login successful
    res.json({ success: true, data: user });
  } catch (error) {
    console.log("Error logging in user:", error);
    res.status(500).json({ success: false, message: "Failed to login" });
  }
}

module.exports = { register, login };
