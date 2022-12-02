const express = require("express");
const router = express.Router();
const User = require("../../models/userSchema");
const authorize = require("../../middleware/authorize");



// @route  GET api/users
// @desc   Get all user list
// @access Only ADMIN
router.get("/users", authorize, async (req, res) => {
    if (!req.user.permissions.admin) {
      return res.status(401).json({ errors: [{ msg: "Unauthorized" }] });
    }
    try {
      const users = await User.find().select("-password");
      return res.json(users);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("Server error");
    }

  });
  
  // @route  POST api/permissions
  // @desc   Change the user permissions
  // @access Only ADMIN
  router.post("/permissions", authorize, async (req, res) => {
    console.log(req.body)
    if (!req.user.permissions.admin) {
      return res.status(401).json({ errors: [{ msg: "Unauthorized" }] });
    }
    try {
      let user = await User.findById(req.body.userId);
      if (!user) return res.status(500).send("Server error");
      user.permissions = req.body.permissions;
      user.save();
      return res.status(200).send("Ok");
    } catch (error) {
      return res.status(500).send("Server error");
    }
  });
  
  // @route  POST api/activation
  // @desc   Change active status of users
  // @access Only ADMIN
  router.post("/activation", authorize, async (req, res) => {
    if (!req.user.permissions.admin) {
      return res.status(401).json({ errors: [{ msg: "Unauthorized" }] });
    }
    try {
      let user = await User.findById(req.body.userId);
      if (!user) return res.status(500).send("Server error");
      user.isActive = req.body.isActive;
      user.save();
      return res.status(200).send(user);
    } catch (error) {
      return res.status(500).send("Server error");
    }
  });
  


module.exports = router;
