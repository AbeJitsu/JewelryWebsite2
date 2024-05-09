// /Users/abiezerreyes/Documents/JewelryWebsite2/server/src/api/middleware/errorHandling.js

// Standard error handling middleware
exports.errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.status || 500;
  const errorMessage = err.customMessage || "An unexpected error occurred";
  res.status(statusCode).json({
    error: errorMessage,
    message: err.message || "An unexpected error has occurred.",
  });
};

// Utility function to handle async operations in routes
exports.asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
