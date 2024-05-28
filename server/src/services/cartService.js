// server/src/services/cartService.js

const Cart = require("../api/models/cartModel");
const Product = require("../api/models/productModel");

exports.getCart = async (query) => {
  return await Cart.findOne(query).populate("items.product");
};

exports.addItemToCart = async (query, productId, quantity) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }

  let cart = await Cart.findOne(query);

  if (cart) {
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );
    if (itemIndex !== -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }
  } else {
    cart = new Cart({
      user: query.user,
      sessionToken: query.sessionToken,
      items: [{ product: productId, quantity }],
    });
  }

  await cart.save();
  return await Cart.findOne(query).populate("items.product");
};

exports.updateItemQuantity = async (query, productId, quantity) => {
  const cart = await Cart.findOne(query);
  if (!cart) throw new Error("Cart not found");

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );
  if (itemIndex !== -1) {
    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    return await Cart.findOne(query).populate("items.product");
  } else {
    throw new Error("Item not found in cart");
  }
};

exports.removeItemFromCart = async (query, productId) => {
  const cart = await Cart.findOneAndUpdate(
    query,
    { $pull: { items: { product: productId } } },
    { new: true }
  ).populate("items.product");
  if (!cart) throw new Error("Cart not found");
  return cart;
};

exports.syncCart = async (query, cartItems) => {
  let cart = await Cart.findOne(query);
  if (!cart) {
    cart = new Cart({
      user: query.user,
      sessionToken: query.sessionToken,
      items: cartItems,
    });
  } else {
    cart.items = cartItems;
  }
  await cart.save();
  return await Cart.findOne(query).populate("items.product");
};


exports.mergeCart = async (userId, localCartItems) => {
  let userCart = await Cart.findOne({ user: userId });

  if (!userCart) {
    userCart = new Cart({ user: userId, items: [] });
  }

  for (const localItem of localCartItems) {
    const itemIndex = userCart.items.findIndex(
      (item) => item.product.toString() === localItem.product._id
    );
    if (itemIndex !== -1) {
      userCart.items[itemIndex].quantity += localItem.quantity;
    } else {
      userCart.items.push({
        product: localItem.product._id,
        quantity: localItem.quantity,
      });
    }
  }

  await userCart.save();
  return await Cart.findOne({ user: userId }).populate("items.product");
};
