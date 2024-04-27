//Users/abiezerreyes/Projects/JewelryWebsite2/server/src/middleware/errorHandling.js

const express = require("express");

/**
 * Middleware for handling exceptions caught in Express routes and middleware.
 * @param {Error} err - The error object caught.
 * @param {Request} req - The express request object.
 * @param {Response} res - The express response object.
 * @param {Function} next - The next middleware function in the stack.
 */
module.exports.errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);

  const customMessage = err.customMessage || "An unexpected error occurred";

  res.status(err.status || 500).send({
    error: customMessage,
    message: err.message || "An unexpected error has occurred.",
  });
};

/**
 * Handles asynchronous route operations, capturing errors and passing them to the Express error handler.
 * @param {Function} fn The async function to wrap.
 * @returns {Function} A function that executes the async function and catches any errors.
 */
exports.asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

/**
 * Universal error handler to standardize response structure and logging.
 * @param {Response} res - The express response object.
 * @param {Error} error - The error object.
 * @param {String} customMessage - Custom message for logging.
 */
exports.handleError = (res, error, customMessage = "An error occurred") => {
  console.error(`${customMessage}:`, error);
  res.status(500).json({ error: `${customMessage}` });
};
