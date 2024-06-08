// server/src/config/session.js

/* const session = require("express-session");
const MongoStore = require("connect-mongo");

const createSessionConfig = () => {
  return session({
    secret: process.env.SERVER_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.SERVER_MONGODB_URI,
      collectionName: "sessions",
      stringify: false,
      autoRemove: "native",
      touchAfter: 24 * 60 * 60, // time period in seconds
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      secure: process.env.SERVER_NODE_ENV === "production", // Set to true if in production
      httpOnly: true,
      sameSite: "lax",
    },
  });
};

const applySessionMiddleware = (app) => {
  app.use(createSessionConfig());

  app.use((req, res, next) => {
    console.log(`session.js Session ID: ${req.sessionID}`);
    console.log(`session.js Session Data: ${JSON.stringify(req.session)}`); */

    // Check and log the _id from the MongoDB session store
    
 /*    const sessionStore = MongoStore.create({
      mongoUrl: process.env.SERVER_MONGODB_URI,
      collectionName: "sessions",
    });

    sessionStore.get(req.sessionID, (err, session) => {
      if (err) {
        console.error("Error retrieving session:", err);
      } else {
        if (session && session._id) {
          console.log(`MongoDB session _id: ${session._id}`);
        }
      }
      next();
    });
  });

  console.log("Session middleware in session.js applied.");
};

module.exports = { createSessionConfig, applySessionMiddleware };
 */