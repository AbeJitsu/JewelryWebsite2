// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/services/userService.js

const User = require("@/api/models/userModel");

module.exports = {
  createUser: async (userData) => {
    const user = new User(userData);
    await user.save();
    return user;
  },

  getUserById: async (userId) => {
    return await User.findById(userId);
  },

  updateUser: async (userId, updateData) => {
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
  },

  deleteUser: async (userId) => {
    return await User.findByIdAndDelete(userId);
  },

  getUserByEmail: async (email) => {
    try {
      console.log("Fetching user by email (original):", email);
      const sanitizedEmail = email.trim().toLowerCase();
      console.log("Fetching user by email (sanitized):", sanitizedEmail);
      const user = await User.findOne({ email: sanitizedEmail });
      console.log("User fetched:", user);
      return user;
    } catch (error) {
      console.error("Error fetching user by email:", error);
      throw new Error("Error fetching user");
    }
  },
};
