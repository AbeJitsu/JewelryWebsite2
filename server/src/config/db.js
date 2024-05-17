// /Users/abiezerreyes/Documents/JewelryWebsite2/server/src/config/db.js

const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoURI =
    process.env.SERVER_MONGODB_URI ||
    "mongodb://localhost:27017/jewelryStoreDB";
  try {
    const conn = await mongoose.connect(mongoURI);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
