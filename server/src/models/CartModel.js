const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
  },
  reservedUntil: {
    type: Date,
    required: true,
    index: { expires: "7d" }, // Ensures items are automatically removed after 7 days
  },
});

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    sessionToken: {
      type: String,
      default: null,
    },
    items: [cartItemSchema],
  },
  {
    timestamps: true,
  }
);

cartSchema.methods.addItem = function (item) {
  const index = this.items.findIndex(
    (i) => i.product.toString() === item.product.toString()
  );
  if (index !== -1) {
    this.items[index].quantity = Math.max(
      this.items[index].quantity,
      item.quantity
    );
  } else {
    this.items.push(item);
  }
};

cartSchema.methods.removeItem = function (productId) {
  this.items = this.items.filter(
    (i) => i.product.toString() !== productId.toString()
  );
};

cartSchema.statics.convertGuestCartToUserCart = async function (
  sessionToken,
  userId
) {
  const guestCart = await this.findOne({ sessionToken }).populate(
    "items.product"
  );
  if (!guestCart) return;

  const userCart = await this.findOneAndUpdate(
    { user: userId },
    {
      $push: {
        items: {
          $each: guestCart.items
            .filter((item) => item.product.status === "available")
            .map((item) => ({
              product: item.product._id,
              quantity: item.quantity,
              reservedUntil: item.reservedUntil,
            })),
        },
      },
    },
    { new: true, upsert: true }
  );

  if (userCart) await guestCart.remove();
};

module.exports = mongoose.model("Cart", cartSchema);
