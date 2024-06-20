// server/src/middleware/auth/authMiddleware.js

const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");

exports.authMiddleware = async (req, res, next) => {
  if (!req.session || !req.session.user_id) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  try {
    const user = await User.findById(req.session.user_id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.roleMiddleware = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};
