// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/api/middleware/auth/authMiddleware.js

const User = require("../../models/userModel");
const authService = require("../../../services/authService");

exports.authMiddleware = async function (req, res, next) {
  console.log(`Session ID in authMiddleware: ${req.sessionID}`);

  if (req.session && req.session.userId) {
    console.log(`Authenticated user: ${req.session.userId}`);
    req.userId = req.session.userId;
    next();
  } else if (req.headers.authorization) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) throw new Error("Token not found");
      const decoded = await authService.verifyToken(token);
      req.userId = decoded.id;
      console.log(`Authenticated user via token: ${req.userId}`);
      next();
    } catch (error) {
      console.log("Unauthorized access attempt via token", error);
      res.status(401).json({ message: "Unauthorized access" });
    }
  } else {
    console.log("Unauthorized access attempt");
    res.status(401).json({ message: "Unauthorized access" });
  }
};

exports.roleMiddleware = function (roles) {
  return async function (req, res, next) {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    try {
      const user = await User.findById(req.userId);
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
