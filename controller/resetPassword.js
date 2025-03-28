const { sendResetSuccessfulEmail } = require("../mailtrap/emails");
const userModel = require("../models/userModel");
const bcryptjs = require("bcryptjs");

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired reset token" });
    }

    // Update password
    const hashedPassword = await bcryptjs.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    // Send Email
    await sendResetSuccessfulEmail(user.email);

    res
      .status(200)
      .json({ success: true, message: "Password reset was successful" });
  } catch (err) {
    console.log("Error in reset password", err);
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = resetPassword;
