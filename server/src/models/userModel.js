// Importing necessary libraries
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // bcryptjs is used for hashing passwords

// Schema for address, defining the structure for user addresses
const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: [true, "Street address is required"],
    trim: true,
  },
  apartment: {
    type: String,
    required: false, // Not required, can be empty
    trim: true,
  },
  city: {
    type: String,
    required: [true, "City is required"],
    trim: true,
  },
  state: {
    type: String,
    required: [true, "State is required"],
    trim: true,
  },
  zip: {
    type: String,
    required: [true, "ZIP code is required"],
    trim: true,
  },
});

// User schema defining the structure for user data
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
  billingAddress: addressSchema,
  shippingAddress: addressSchema,
  role: {
    type: String,
    enum: ["user", "admin", "vip"], // Specify allowable roles
    default: "user",
  },
});

// Pre-save hook to hash the password before saving it to the database
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      next(error); // Properly pass the error on to the next middleware
    }
  } else {
    next(); // Ensure that next() is called when the password hasn't been modified
  }
});


// Method to compare a candidate password with the user's stored password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Creating the User model from the userSchema
const User = mongoose.model("User", userSchema);

module.exports = User;
