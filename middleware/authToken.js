const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        // 401 is more appropriate for authentication failures
        message: "Unauthorized - No token provided",
        error: true,
        success: false,
      });
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        console.error("Unauthorized - Invalid token:", err.message);
        return res.status(403).json({
          // 403 means Forbidden (valid token but unauthorized access)
          message: "Unauthorized - Invalid token",
          error: true,
          success: false,
        });
      }

      req.userId = decoded?._id || decoded?.id; // Ensure correct user ID assignment
      next();
    });
  } catch (err) {
    res.status(500).json({
      // 500 indicates a server error
      message: "Internal Server Error",
      error: true,
      success: false,
    });
  }
}

module.exports = authToken;
