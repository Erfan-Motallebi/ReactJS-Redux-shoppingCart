import React, { Component } from "react";
// feature-1
import "./App.css";
import productData from "./productData.json";
import Products from "./components/Products";
class App extends Component {
  constructor() {
    super();
    this.state = {
      products: productData.product,
      size: "",
      sort: "",
    };
  }

  render() {
    return (
      <div class="grid-container">
        <header>
          <h3>React Shopping Cart</h3>
        </header>
        <main>
          <div class="content">
            <div className="main-content">
              <Products products={this.state.products} />
            </div>
            <div className="sideBar">SideBars</div>
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
