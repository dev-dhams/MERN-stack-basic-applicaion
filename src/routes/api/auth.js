/** @format */

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/userSchema");
const authorize = require("../../middleware/authorize");

const JWT_SECRET = process.env.JWT_SECRET

// @route  GET api/auth
// @desc   Send user detail
// @access Private
router.get('/auth', authorize, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -isActive');
    return res.json(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server error');
  }
});

// @route  POST api/register
// @desc   Register User & Send JWT Token
// @access Public
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(403).json({ errors: [{ msg: "User already exists" }] });
    }
    user = new User({ name, email, password });
    // Hashing password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    // Generate JWT
    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET || JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        return res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server error");
  }
});

// @route  POST api/login
// @desc   Login User & Send JWT Token
// @access Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Invalid password or email" }] });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Invalid password or email" }] });
    }
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET || JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        return res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
