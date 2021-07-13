const express = require("express");
const router = express.Router();
const filterRouter = express.Router();

// ! controllers
const {
  postProduct,
  getProduct,
  deleteProduct,
  filterProductsByPrice,
  filterProductsBySize,
} = require("../routes/controllers/productController");

router.route("/").get(getProduct).post(postProduct);

filterRouter.get("/:id", filterProductsByPrice);
filterRouter.get("/:id", filterProductsBySize);

router.delete("/:id", deleteProduct);

module.exports = { router, filterRouter };
