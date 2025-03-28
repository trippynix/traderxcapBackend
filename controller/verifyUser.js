const userModel = require("../models/userModel");

async function verifyUserController(req, res) {
  try {
    const user = await userModel.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({
      message: "Authorized",
      success: true,
      user,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}

module.exports = verifyUserController;
