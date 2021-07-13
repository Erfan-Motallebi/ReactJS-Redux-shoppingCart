const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

const orderedProductSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => nanoid(),
  },
  name: {
    type: String,
    lowercase: true,
    trim: true,
    minLength: 4,
    maxLengthL: 30,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    minLength: 4,
    maxLengthL: 50,
  },
  address: {
    type: String,
    lowercase: true,
    minLength: 4,
    maxLengthL: 50,
  },
  total: String,
  cartItems: [Object],
});

const OrderedProductModel = mongoose.model(
  "OrderedProduct",
  orderedProductSchema
);

module.exports = OrderedProductModel;
