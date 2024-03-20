// authMiddleware.js

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

    const user = await User.findById(req.session.userId);
    if (!roles.includes(user.role)) {
      return res
        .status(403)
        .send({ message: "Forbidden access: Insufficient role" });
    }

    next();
  };
}

module.exports = { authMiddleware, roleMiddleware };
