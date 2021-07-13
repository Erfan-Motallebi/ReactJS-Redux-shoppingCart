const mongoose = require("mongoose");
const { Schema } = mongoose;
const { nanoid } = require("nanoid");

const productSchema = new Schema({
  _id: {
    type: String,
    default: () => nanoid(),
  },
  image: String,
  title: String,
  description: String,
  price: Number,
  availableSizes: {
    type: [String],
    trim: true,
    lowercase: true,
  },
});

const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;
