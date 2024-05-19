// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/config/session.js

const session = require("express-session");
const MongoStore = require("connect-mongo");

const createSessionConfig = () => {
  return {
    secret: process.env.SERVER_SESSION_SECRET,
    resave: false,
    saveUninitialized: false, // Ensures carts are created for unauthenticated users
    store: MongoStore.create({
      mongoUrl: process.env.SERVER_MONGODB_URI,
      collectionName: "sessions",
      ttl: 24 * 60 * 60, // 1 day
      autoRemove: "native",
    }),
    cookie: {
      secure: process.env.SERVER_NODE_ENV === "production", // False if not in production
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  };
};

module.exports = createSessionConfig;
