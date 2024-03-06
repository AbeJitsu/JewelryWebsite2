//Users/abiezerreyes/Projects/JewelryWebsite2/server/src/models/userModel.js

const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs"); // Temporarily not needed for plaintext password

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
    minLength: [8, "Password must be at least 8 characters long"],
  },
  preferredFirstName: {
    type: String,
    required: [true, "Preferred first name is required"],
    trim: true,
    maxLength: [
      20,
      "Preferred first name must be less than 20 characters long",
    ],
  },
});

// Comment out the pre-save hook to avoid hashing the password temporarily
// userSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });

// Method to compare a candidate password with the user's stored password
// This can also be commented out as it's not needed for plaintext comparison
// userSchema.methods.comparePassword = function (candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.password);
// };

const User = mongoose.model("User", userSchema);

module.exports = User;
