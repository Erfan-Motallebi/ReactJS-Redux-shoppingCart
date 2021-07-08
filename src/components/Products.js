import React, { Component } from "react";
import currencyFormat from "../utils";

export default class Products extends Component {
  render() {
    return (
      <div>
        <ul className="products">
          {this.props.products.map((product) => {
            return (
              <li key={product._id}>
                <div className="product">
                  <a href={"#" + product._id}>
                    <img src={product.image} alt={product.title} />
                    <p>{product.title}</p>
                  </a>
                  <div className="product-price">
                    <div>
                      <h3>{currencyFormat(product.price)}</h3>
                    </div>
                    <button
                      onClick={() => this.props.addToCart(product)}
                      className="btn primary"
                    >
                      Add To Cart{" "}
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
