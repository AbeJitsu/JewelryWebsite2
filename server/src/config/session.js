const session = require("express-session");
const MongoStore = require("connect-mongo");

// This function creates and returns the MongoDB store using connect-mongo
function createMongoStore() {
  return MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: "sessions",
  });
}

// This function configures and returns the session settings
function createSessionConfig() {
  return {
    secret: process.env.SESSION_SECRET || "changeThisSecret",
    resave: false,
    saveUninitialized: false,
    store: createMongoStore(),
    cookie: {
      secure: process.env.NODE_ENV === "production", // use secure cookies in production only
      httpOnly: true,
      sameSite: "lax", // helps protect against CSRF
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  };
}

module.exports = createSessionConfig;
