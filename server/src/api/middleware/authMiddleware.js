// /Users/abiezerreyes/Documents/JewelryWebsite2/server/src/api/middleware/authMiddleware.js

const User = require("../models/userModel");

exports.authMiddleware = function (req, res, next) {
  if (req.session && req.session.userId) {
    req.userId = req.session.userId;
    next();
  } else {
    res.status(401).json({ message: "Unauthorized access" });
  }
};

exports.roleMiddleware = function (roles) {
  return async function (req, res, next) {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    try {
      const user = await User.findById(req.session.userId);
      if (!user || !roles.includes(user.role)) {
        return res
          .status(403)
          .json({ message: "Forbidden access: Insufficient role" });
      }
      next();
    } catch (error) {
      console.error("Error verifying user role:", error);
      res
        .status(500)
        .json({ message: "Internal server error during role verification" });
    }
  };
};
