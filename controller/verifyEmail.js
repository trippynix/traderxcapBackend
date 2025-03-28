const userModel = require("../models/userModel");

const verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    // Check if userId is stored in session
    if (!req.session.userId) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized request. Please sign up again.",
      });
    }
    // Fetch the user using session userId
    const user = await userModel.findOne({
      _id: req.session.userId,
      emailVerificationToken: code,
      emailVerificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationTokenExpiresAt = undefined;
    await user.save();

    req.session.destroy();
    res.clearCookie("connect.sid");

    // Send email

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (err) {
    console.log("error in verifyemail", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = verifyEmail;
