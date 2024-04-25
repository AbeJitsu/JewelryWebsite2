require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");
const createSessionConfig = require("./config/session");
const connectDB = require("./config/db");
const routes = require("./routes");
const errorHandler = require("./middleware/errorHandling");

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:8080",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Inside server.js
console.log("Session config:", createSessionConfig());
app.use(session(createSessionConfig()));

app.use("/api", routes);

app.use(errorHandler);

if (require.main === module) {
  app.listen(port, () => console.log(`Server listening on port ${port}`));
}

module.exports = app;

// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/server.js
