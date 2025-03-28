async function userLogoutController(req, res) {
  try {
    res.clearCookie("token");

    res.status(200).json({
      message: "Logged out successfully!",
      error: false,
      success: true,
      data: [],
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userLogoutController;
