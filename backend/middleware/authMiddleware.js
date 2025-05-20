const jwt = require('jsonwebtoken');

const tokenVerify = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(400).json({ message: "Token is missing" });
    }
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.user = { userId: decode.userId };
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = tokenVerify;
