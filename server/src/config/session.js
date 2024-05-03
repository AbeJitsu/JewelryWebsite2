const session = require("express-session");
const MongoStore = require("connect-mongo");

const createSessionConfig = () => {
  const config = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: "sessions",
      ttl: 24 * 60 * 60,
      autoRemove: "native",
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  };
  console.log("Session Config:", config);
  return config;
};

module.exports = createSessionConfig;

// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/config/session.js