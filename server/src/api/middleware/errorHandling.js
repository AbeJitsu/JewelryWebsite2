// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/api/middleware/errorHandling.js

exports.errorHandler = (err, req, res, next) => {
  console.error("Error stack:", err.stack);
  const sessionData = req.session || {};
  console.error("Session Data:", sessionData);
  console.error("User ID:", sessionData.user_id);
  const statusCode = err.status || 500;
  const errorMessage = err.customMessage || "An unexpected error occurred";
  res.status(statusCode).json({
    message: errorMessage,
    error: err.message || "An unexpected error has occurred.",
  });
};

exports.asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Utility function to handle async operations in routes
