// /Users/abiezerreyes/Projects/JewelryWebsite2/server/src/controllers/userController.js

const User = require("../models/userModel");

// Update user's address information
exports.updateAddress = async (req, res) => {
  const { userId } = req.session; // Use session to fetch user ID
  const { billingAddress, shippingAddress } = req.body;

  if (!userId) {
    return res.status(403).json({ message: "No user session found" });
  }

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { billingAddress, shippingAddress } },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Address updated successfully",
      data: {
        billingAddress: user.billingAddress,
        shippingAddress: user.shippingAddress,
      },
    });
  } catch (error) {
    console.error("Error updating user address:", error);
    res
      .status(500)
      .json({ message: "Error updating address", error: error.toString() });
  }
};

// Retrieve user's address information
exports.getAddress = async (req, res) => {
  const { userId } = req.session; // Use session to fetch user ID

  if (!userId) {
    return res.status(403).json({ message: "No user session found" });
  }

  try {
    const user = await User.findById(userId, "billingAddress shippingAddress");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Address retrieved successfully",
      data: {
        billingAddress: user.billingAddress,
        shippingAddress: user.shippingAddress,
      },
    });
  } catch (error) {
    console.error("Error retrieving user address:", error);
    res
      .status(500)
      .json({ message: "Error retrieving address", error: error.toString() });
  }
};
