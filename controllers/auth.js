const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const ErrorResponse = require("../utility/errorResponse")
const User = require("../models/users");
const Dashboard = require("../models/dashboard");
const Wallet = require("../models/wallet");

// Register new user. Will create 3 documents at the same time
router.post("/registerUser", async (req, res, next) => {
    const { name, email, password, dateOfBirth } = req.body;
  
    try {
      // Create User
      const user = await User.create({
        name,
        email,
        password,
        // dateOfBirth,
      });
  
      // Create Dashboard
      const dashboard = new Dashboard({ owner: user._id });
      await dashboard.save();
  
      // Create Wallet
      const wallet = new Wallet({ owner: user._id });
      await wallet.save();
  
      sendToken(user, 200, res);
      console.log([user, dashboard, wallet]);
    } catch (err) {
      next(err);
    }
  });

// Login
router.post("/login", async (req, res, next) => {
    const { email, password } = req.body;

  // Check if email and password is provided
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  try {
    // Check that user exists by email
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // Check that password match
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    sendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
})

router.post("/forgotpassword", async (req, res, next) => {
    // Send Email to email provided but first check if user exists
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return next(new ErrorResponse("No email could not be sent", 404));
      }
  
      // Reset Token Gen and add to database hashed (private) version of token
      const resetToken = user.getResetPasswordToken();
  
      await user.save();
  
      // Create reset url to email to provided email
      const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;
  
      // HTML Message
      const message = `
        <h1>You have requested a password reset</h1>
        <p>Please make a put request to the following link:</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
      `;
  
      try {
        await sendEmail({
          to: user.email,
          subject: "Password Reset Request",
          text: message,
        });
  
        res.status(200).json({ success: true, data: "Email Sent" });
      } catch (err) {
        console.log(err);
  
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
  
        await user.save();
  
        return next(new ErrorResponse("Email could not be sent", 500));
      }
    } catch (err) {
      next(err);
    }
  });

router.put("/passwordreset/:resetToken", async (req, res, next) => {
    // Compare token in URL params to hashed token
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.resetToken)
      .digest("hex");
  
    try {
      const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
      });
  
      if (!user) {
        return next(new ErrorResponse("Invalid Token", 400));
      }
  
      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
  
      await user.save();
  
      res.status(201).json({
        success: true,
        data: "Password Updated Success",
        token: user.getSignedJwtToken(),
      });
    } catch (err) {
      next(err);
    }
  });
  
  const sendToken = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    res.status(statusCode).json({ sucess: true, token, user: user._id });
  }; 

module.exports = router;