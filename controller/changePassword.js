const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

async function changePasswordController(req, res) {
  try {
    const { userID, newPassword, oldPassword, password } = req.body;

    const checkPass = await bcrypt.compare(oldPassword, password);

    if (checkPass) {
      if (oldPassword !== newPassword) {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hash(newPassword, salt);
        const payLoad = {
          ...(newPassword && { password: hashPassword }),
          role: "GENERAL",
        };
        const userData = await userModel.findByIdAndUpdate(userID, payLoad);
        res.status(201).json({
          data: userData,
          success: true,
          error: false,
          message: "Password updated successfully!",
        });
      } else {
        throw new Error("New password cannot be the same as the old password.");
      }
    } else {
      throw new Error("Old password is incorrect. Please try again.");
    }
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = changePasswordController;
