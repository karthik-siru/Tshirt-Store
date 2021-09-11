const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const ProductCartSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Product",
  },
  name: String,
  count: String,
  price: Number,
});

const ProductCart = mongoose.model("ProductCart", ProductCartSchema);

const OrderSchema = mongoose.Schema(
  {
    products: [ProductCartSchema],
    amount: { type: Number },
    address: { type: String, maxlength: 2000 },
    status: {
      type: String,
      default: "Recieved",
      enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Recieved"],
    },
    transaction_id: {},
    updated: Date,
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order, ProductCart };
