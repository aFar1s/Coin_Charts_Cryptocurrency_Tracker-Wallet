const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UsersSchema = new mongoose.Schema({
  email: {
    type: String,
    require: [true, "Please enter username"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email address",
    ],
  },
  name: {
    type: String,
    require: [true, "Please enter name"],
  },
  password: {
    type: String,
    require: [true, "Password required"],
    minlength: 6,
    select: false,
  },
  dateOfBirth: {
    type: Date,
    require: [true, "Please verify age"],
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

UsersSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UsersSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UsersSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UsersSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token (private key) and save to database
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set token expire date
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes

  return resetToken;
};

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
