const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();
const ErrorResponse = require("../utility/errorResponse")
const User = require("../models/users")

const protect = async (req, res, next) => {
    let token;
  
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
  
    if (!token) {
      return next(new ErrorResponse("Not authorized to access this route", 401));
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      const user = await User.findById(decoded.id);
  
      if (!user) {
        return next(new ErrorResponse("No user found with this id", 404));
      }
  
      req.user = user;
  
      next();
    } catch (err) {
      return next(new ErrorResponse("Not authorized to access this router", 401));
    }
  };

router.route("/").get(protect, (req, res, next) => {
    res
      .status(200)
      .json({
        success: true,
        data: "You got access to the private data in this route",
      });
  });

module.exports = router;