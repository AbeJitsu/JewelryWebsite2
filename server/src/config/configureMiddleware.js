// server/src/config/configureMiddleware.js

const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");
const createSessionConfig = require("@/config/session");
const errorHandler = require("@/api/middleware/errorHandling").errorHandler;
const logger = require("@/api/middleware/logger");

module.exports = (app) => {
  app.use(logger); // 1. Logger Middleware
  app.use(
    cors({
      origin: ["http://localhost:8080", "http://localhost:3000"],
      credentials: true,
    })
  ); // 2. CORS Middleware
  app.use(helmet()); // 3. Helmet Middleware
  app.use(bodyParser.json()); // 4. Body Parser Middleware (JSON)
  app.use(bodyParser.urlencoded({ extended: true })); // 4. Body Parser Middleware (URL-encoded)
  app.use(morgan("dev")); // 5. Morgan Middleware
  app.use(session(createSessionConfig())); // 6. Session Middleware
  app.use(errorHandler); // 7. Error Handling Middleware
};
