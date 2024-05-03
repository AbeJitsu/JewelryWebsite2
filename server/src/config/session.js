const session = require("express-session");
const MongoStore = require("connect-mongo");

const createSessionConfig = () => {
  return {
    secret: process.env.SESSION_SECRET, // Use a strong secret from environment variables
    resave: false, // Do not save session if unmodified
    saveUninitialized: false, // Do not save uninitialized session
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI, // MongoDB connection string
      collectionName: "sessions", // Collection to store sessions
      ttl: 24 * 60 * 60, // = 86400 seconds = 24 hours, session expiration time
      autoRemove: "native", // Automatically remove expired sessions
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production environments only
      httpOnly: true, // Prevent client-side JavaScript from accessing the cookie data
      sameSite: "lax", // Protect against CSRF attacks
      maxAge: 24 * 60 * 60 * 1000, // 24 hours; cookie expiration is set to match session expiration
    },
  };
};

module.exports = createSessionConfig;
// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/config/session.js