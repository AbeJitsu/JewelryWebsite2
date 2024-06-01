// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/api/middleware/auth/authMiddleware.js
const User = require("../../models/userModel");
const authService = require("../../../services/authService");

exports.authMiddleware = async function (req, res, next) {
  console.log("Session ID in authMiddleware:", req.sessionID);
  if (req.session.user_id) {
    console.log("Authenticated user via session:", req.session.user_id);
    return next();
  } else if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = await authService.verifyToken(token);
      console.log("Authenticated user via token:", decoded.id);
      req.session.user_id = decoded.id;
      return next();
    } catch (error) {
      console.log("Unauthorized access attempt via token:", error);
      return res.status(401).json({ message: "Unauthorized access" });
    }
  } else {
    console.log("Unauthorized access attempt");
    return res.status(401).json({ message: "Unauthorized access" });
  }
};

exports.roleMiddleware = function (roles) {
  return async function (req, res, next) {
    if (!req.user_id) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    try {
      const user = await User.findById(req.user_id);
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
