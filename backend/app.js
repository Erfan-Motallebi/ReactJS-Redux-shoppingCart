const express = require("express");
const mongoose = require("mongoose");

const app = express();

// ! middlewares
const morgan = require("morgan");

// ! router sections
const {
  router: productRoutes,
  filterRouter: filterProductRoutes,
} = require("./routes/products");
/**
 * mongoose connection
 */

mongoose.connect("mongodb://localhost:27017/react-shopping-cart-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection
  .once("connected", () => {
    console.info("connected to MongoDB");
  })
  .on("error", (error) => {
    console.error(error);
  });

// using this to accept post request as a json file
app.use(express.json());
/**
 * ! TODO: middleWares
 */
app.use(morgan("dev"));

/**
 * ! Routes
 */
app.use("/api/products", productRoutes, filterProductRoutes);

module.exports = app;
