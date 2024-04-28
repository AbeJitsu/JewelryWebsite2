const session = require("express-session");
const MongoStore = require("connect-mongo");

const createSessionConfig = () => {
  return {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: "sessions",
      // autoRemove: "interval",
      // autoRemoveInterval: 10, // Removes expired sessions every 10 minutes
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      httpOnly: true,
      sameSite: "lax", // Helps protect against CSRF
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  };
};

module.exports = createSessionConfig;
