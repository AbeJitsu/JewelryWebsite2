// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/config/configureMiddleware.js

const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const errorHandler = require("@/api/middleware/errorHandling").errorHandler;
const logger = require("@/api/middleware/logger");

module.exports = (app) => {
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

  app.use(errorHandler);
};
