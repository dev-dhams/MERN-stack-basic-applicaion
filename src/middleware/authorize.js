/** @format */

const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

const JWT_SECRET = "this_should_jwt_secret_key";

module.exports = async function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');
  // Check if not token
  if (!token) {
    return res.status(401).json({msg: 'No token, authorization denied'});
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || JWT_SECRET);
    let user = await User.findById(decoded.user.id, '-password');
    if (user){
      req.user = user;
    }else{
      return res.status(498).json({msg: 'Invalid Token'});
    }
    next();
  } catch (err) {
    return res.status(498).json({msg: 'Invalid Token'});
  }
};
