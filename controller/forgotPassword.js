const { sendPasswordResetEmail } = require("../mailtrap/emails");
const userModel = require("../models/userModel");
const crypto = require("crypto");

const forgotPassword = async (req, res) => {
  console.log("Response Sent: ");
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    // Send email
    await sendPasswordResetEmail(
      user.email,
      `${process.env.FRONTEND_URL}/reset-password/${resetToken}`
    );

    res.status(200).json({
      success: true,
      message: "Password reset link sent successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = forgotPassword;
