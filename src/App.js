/* eslint-disable array-callback-return */
import React, { Component } from "react";
// feature-1
import "./App.css";
import productData from "./productData.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
class App extends Component {
  constructor() {
    super();
    this.state = {
      products: productData.product,
      cartItems: [],
      size: "",
      sort: "",
    };
  }

  productFilter = (event) => {
    if (event.target.value === "") {
      this.setState({
        size: event.target.value,
        products: productData.product,
      });
    } else {
      this.setState({
        size: event.target.value,
        products: productData.product.filter(
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
  };

  removeCart = (cartId) => {
    this.setState((state) => ({
      cartItems: state.cartItems.filter((product) => product._id !== cartId),
    }));
  };

  render() {
    return (
      <div className="grid-container">
        <header>
          <h3>React Shopping Cart</h3>
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
                cartItems={this.state.cartItems}
                removeCart={this.removeCart}
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
