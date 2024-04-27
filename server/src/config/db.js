// server/src/config/db.js

const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoURI =
    process.env.MONGODB_URI || "mongodb://localhost:27017/jewelryStoreDB";
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
