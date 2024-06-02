// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/api/controllers/userController.js

const User = require("@/api/models/userModel");

// Method to update user's address information
exports.updateAddress = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have user id from session or JWT token
    const { billingAddress, shippingAddress } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { billingAddress, shippingAddress } },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).json({
      message: "Address updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({ message: "Error updating address", error });
  }
};

// Method to retrieve user's address information
exports.getAddress = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have user id from session or JWT token

    const user = await User.findById(userId, "billingAddress shippingAddress");

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).json({
      message: "Address retrieved successfully",
      billingAddress: user.billingAddress,
      shippingAddress: user.shippingAddress,
    });
  } catch (error) {
    res.status(500).send({ message: "Error retrieving address", error });
  }
};
