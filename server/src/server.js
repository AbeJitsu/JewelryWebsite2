const express = require("express");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session"); // Import express-session here

const connectDB = require("./config/db");
connectDB();

const createSessionConfig = require("./config/session"); // Import your session configuration function
const routes = require("./routes/index");
const errorHandlingMiddleware = require("./middleware/errorHandling");

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later.",
});

const port = process.env.PORT || 3000;

app.use(limiter);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(session(createSessionConfig())); // Apply session configuration

app.use("/api", routes);
app.use(errorHandlingMiddleware);

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

module.exports = app;
