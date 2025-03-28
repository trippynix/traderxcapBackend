const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const generateTokenAndSetCookie = require("../utils/generateTokenAndSetCookie");
const { sendVerificationEmail } = require("../mailtrap/emails");

async function userSignUpController(req, res) {
  try {
    const { name, username, email, password } = req.body;
    const userEmail = await userModel.findOne({ email });
    if (userEmail) {
      throw new Error("User already exists!");
    }
    const userName = await userModel.findOne({ username });
    if (userName) {
      throw new Error("Username already in use!");
    }
    if (!email || !password || !name || !username) {
      throw new Error("All fields are required!");
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(password, salt);

    if (!hashPassword) {
      throw new Error("Something is wrong");
    }

    const emailVerificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const phoneVerificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const payLoad = {
      ...req.body,
      role: "GENERAL",
      paymentStatus: "UNPAID",
      password: hashPassword,
      emailVerificationToken,
      emailVerificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
      phoneVerificationToken,
      phoneVerificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    };
    const userData = new userModel(payLoad);
    await userData.save();

    // ✅ Store userId in session
    req.session.userId = userData._id;

    sendVerificationEmail(
      userData.email,
      emailVerificationToken,
      userData.name
    );

    res.status(201).json({
      success: true,
      error: false,
      message: "User created successfully!",
      data: {
        ...userData._doc,
        password: undefined,
      },
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignUpController;
