// server/src/config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.SERVER_MONGODB_URI);
    console.log("MongoDB connected from db.js:", process.env.SERVER_MONGODB_URI);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
