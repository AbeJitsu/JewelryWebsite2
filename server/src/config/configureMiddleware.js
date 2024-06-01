// server/src/config/configureMiddleware.js

const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");
const logger = require("@/api/middleware/logger");
const errorHandler = require("@/api/middleware/errorHandling").errorHandler;
const createSessionConfig = require("@/config/session");

module.exports = (app) => {
  // Middleware configuration
  app.use(logger);
  app.use(
    cors({
      origin: ["http://localhost:8080", "http://localhost:3000"],
      credentials: true,
    })
  );
  app.use(helmet());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(morgan("dev"));

  // Session setup
  app.use(session(createSessionConfig()));

  // Error handling middleware
  app.use(errorHandler);
};
