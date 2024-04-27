//Users/abiezerreyes/Projects/JewelryWebsite2/server/src/middleware/authMiddleware.js

const User = require("../models/userModel"); // Adjust the path as necessary

function authMiddleware(req, res, next) {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.status(401).send({ message: "Unauthorized access" });
  }
}

// Middleware to check user role
function roleMiddleware(roles) {
  return async (req, res, next) => {
    if (!req.session || !req.session.userId) {
      return res.status(401).send({ message: "Unauthorized access" });
    }

    try {
      const user = await User.findById(req.session.userId);
      if (!user || !roles.includes(user.role)) {
        return res
          .status(403)
          .send({ message: "Forbidden access: Insufficient role" });
      }

      next();
    } catch (error) {
      console.error("Error verifying user role:", error);
      res
        .status(500)
        .send({ message: "Internal server error during role verification" });
    }
  };
}

module.exports = { authMiddleware, roleMiddleware };
