/* eslint-disable array-callback-return */
import React, { Component } from "react";
// feature-1
import "./App.css";
// import productData from "./productData.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
import Flash from "react-reveal/Flash";
import productFetch from "./components/server/productFetch";
import registerProduct from "./components/server/registerProduct";

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
      size: "",
      sort: "",
    };
  }

  componentDidMount() {
    productFetch()
      .then((result) =>
        this.setState({
          products: result,
        })
      )
      .catch((err) => {
        console.log({
          error: err,
        });
      });
  }

  productFilter = (event) => {
    if (event.target.value === "") {
      this.setState({
        size: event.target.value,
        products: this.state.products,
      });
    } else {
      this.setState({
        size: event.target.value,
        products: this.state.products.filter(
          (projekt) =>
            projekt.availableSizes.lastIndexOf(event.target.value) >= 0
        ),
      });
    }
  };

  productOrder = (event) => {
    let sorted = event.target.value;
    this.setState({
      sort: sorted,
      products: this.state.products.sort((firstElem, secondElem) => {
        switch (sorted) {
          case "lowest":
            return firstElem.price - secondElem.price;
          case "highest":
            return secondElem.price - firstElem.price;
          default:
            return firstElem._id > secondElem._id;
        }
      }),
    });
  };

  addToCart = (product) => {
    const newCartItem = this.state.cartItems.slice();
    let alreadyExistence = false;
    newCartItem.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyExistence = true;
      }
    });
    if (!alreadyExistence) {
      newCartItem.push({ ...product, count: 1 });
    }
    this.setState({ cartItems: newCartItem });
    localStorage.setItem("cartItems", JSON.stringify(newCartItem));
    console.log(localStorage.getItem("cartItems"));
  };

  removeCart = (item) => {
    this.setState({
      cartItems: this.state.cartItems.filter(
        (product) => product._id !== item._id
      ),
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(
        this.state.cartItems.filter((product) => product._id !== item._id)
      )
    );
  };

  createOrder = (order) => {
    registerProduct(order);
  };

  render() {
    return (
      <div className="grid-container">
        <header>
          <Flash duration={2000} delay={2000} count={2}>
            <h3>React Shopping Cart</h3>
          </Flash>
        </header>
        <main>
          <div className="content">
            <div className="main-content">
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                productFilter={this.productFilter}
                productOrder={this.productOrder}
              />
              <Products
                products={this.state.products}
                addToCart={this.addToCart}
              />
            </div>
            <div className="sideBar">
              <Cart
                removeCart={this.removeCart}
                cartItems={this.state.cartItems}
                createOrder={this.createOrder}
              />
            </div>
          </div>
        </main>
        <footer>
          <h4>All is reserved </h4>
        </footer>
      </div>
    );
  }
}
export default App;
