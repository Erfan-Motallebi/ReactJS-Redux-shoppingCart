// ! model
const ProductModel = require("../../database/models/product");
const OrderedProductModel = require("../../database/models/orderedProduct");

const getProduct = async (req, res, next) => {
  const Product = await ProductModel.find({});
  res.status(200).send(Product);
};

const postProduct = async (req, res, next) => {
  const OrderedProduct = new OrderedProductModel(req.body);
  const OrderedProductSaved = await OrderedProduct.save();
  res.status(200).send(OrderedProductSaved);
};

const deleteProduct = async (req, res, next) => {
  const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);
  res.status(200).json({
    method: "Delete",
    success: true,
    deletedProduct,
  });
};

const filterProductsByPrice = (req, res, next) => {
  if (Number.isNaN(parseInt(req.params.id))) return next("route");
  ProductModel.find(
    {
      price: { $gt: req.params.id },
    },
    (err, result) => {
      if (!err) {
        res.status(200).json({
          "Filter Item": "price",
          success: true,
          filteredProducts: result,
        });
      } else {
        res.status(404).json({ error: err });
      }
    }
  );
};
const filterProductsBySize = (req, res, next) => {
  const filteredProducts = ProductModel.find({
    availableSizes: { $eq: req.params.id },
  });
  if (filteredProducts) {
    filteredProducts.then((result) => {
      res.status(200).json({
        success: true,
        "Filter Method": "availableSize",
        filteredProducts: result,
      });
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
