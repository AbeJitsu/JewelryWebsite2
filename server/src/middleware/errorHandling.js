/**
 *
 * server/src/middleware/errorHandling.js
 * 
 * Middleware for handling exceptions caught in Express routes and middleware.
 * Ensures errors caught in Express routes are handled uniformly.
 */
module.exports = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.status || 500;
  const errorMessage = err.customMessage || "An unexpected error occurred";

  res.status(statusCode).json({
    error: errorMessage,
    message: err.message || "An unexpected error has occurred.",
  });
};

/**
 * Middleware to handle asynchronous operations in Express routes,
 * automatically passing errors to the next() error handler.
 */
module.exports.asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
