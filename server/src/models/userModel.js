//Users/abiezerreyes/Projects/JewelryWebsite2/server/src/models/userModel.js

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [6, "Password must be at least 6 characters long"],
  },
  preferredFirstName: {
    type: String,
    required: [true, "Preferred first name is required"],
    trim: true,
    maxLength: [
      50,
      "Preferred first name must be less than 50 characters long",
    ],
  },
  // Add any other fields you find necessary for your application
});

// Pre-save hook for password hashing
userSchema.pre("save", async function (next) {
  // Hash the password only if it has been modified (or is new)
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare a candidate password with the user's stored password
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
