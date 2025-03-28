const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: String,
    role: String,
    gender: String,
    phoneNum: String,
    country: String,
    tradingExp: String,
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    emailVerificationToken: String,
    emailVerificationTokenExpiresAt: Date,

    phoneVerificationToken: String,
    phoneVerificationTokenExpiresAt: Date,
    paymentStatus: String,
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
