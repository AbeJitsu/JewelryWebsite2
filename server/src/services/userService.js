// /Users/abiezerreyes/Documents/JewelryWebsite2/server/src/services/userService.js

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
};
