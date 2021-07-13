// ! model
const ProductModel = require("../../database/models/product");

const getProduct = async (req, res, next) => {
  const Product = await ProductModel.find({});
  res.status(200).send(Product);
};

const postProduct = async (req, res, next) => {
  const Product = new ProductModel(req.body);
  const savedProduct = await Product.save();
  res.status(200).send(savedProduct);
};

const deleteProduct = async (req, res, next) => {
  const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);
  res.status(200).json({
    method: "Delete",
    success: true,
    deletedProduct,
  });
};

const filterProductsByPrice = async (req, res, next) => {
  if (Number.isNaN(parseInt(req.params.id))) return next("route");
  const filteredProducts = await ProductModel.find({
    price: { $gt: req.params.id },
  });
  if (filteredProducts) {
    res.status(200).json({
      "Filter Item": "price",
      success: true,
      filteredProducts,
    });
  }
};

const filterProductsBySize = async (req, res, next) => {
  const filteredProducts = await ProductModel.find({
    availableSizes: { $eq: req.params.id },
  });
  if (filteredProducts) {
    res.status(200).json({
      success: true,
      "Filter Method": "availableSize",
      filteredProducts,
    });
  } else {
    res.status(404).json({
      success: false,
      filteredProducts: [],
    });
  }
};

module.exports = {
  postProduct,
  getProduct,
  deleteProduct,
  filterProductsByPrice,
  filterProductsBySize,
};
