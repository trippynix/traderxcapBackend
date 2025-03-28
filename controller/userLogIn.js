const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

async function userLogInController(req, res) {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email) {
      throw new Error("Please provide email");
    }
    if (!password) {
      throw new Error("Please provide password");
    }

    const user = await userModel.findOne({
      $or: [{ email: email }, { username: email }],
    });

    if (!user) {
      throw new Error("User does not exist");
    }

    const checkPass = await bcrypt.compare(password, user.password);

    if (checkPass) {
      const tokenData = {
        _id: user._id,
        email: user.email,
      };
      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
        expiresIn: 60 * 60 * 8,
      });

      const tokenOption = {
        httpOnly: true,
        secure: true,
      };

      res.cookie("token", token, tokenOption).status(200).json({
        message: "Logged in successfully",
        data: token,
        success: true,
        error: false,
      });

      user.lastLogin = new Date();
      await user.save();
    } else {
      throw new Error("Invalid credentials");
    }

    console.log("Password: ", checkPass);
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userLogInController;
