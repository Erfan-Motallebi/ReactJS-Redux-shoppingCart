import React, { Component } from "react";
import currencyFormat from "../utils";

export default class Cart extends Component {
  render() {
    const { cartItems } = this.props;
    return (
      <div>
        <div className="cart">
          {cartItems.length === 0 ? (
            <div>You have empty items added</div>
          ) : (
            <div>You have added {cartItems.length} in the cart</div>
          )}
        </div>
        <div className="main-cart">
          <ul className="cart-item">
            {cartItems.map((item) => {
              return (
                <li key={item._id}>
                  <div>
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div>
                    <div>{item.title}</div>
                    <div className="toRight">
                      {item.count} x {currencyFormat(item.price)}
                      <button
                        className="cart-btn"
                        onClick={() => this.props.removeCart(item._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        {cartItems.length === 0 ? (
          false
        ) : (
          <div className="total">
            <div className="total-price">
              <h2>
                Total :{" "}
                {currencyFormat(
                  cartItems.reduce(
                    (totalVal, currentVal) =>
                      totalVal + currentVal.price * currentVal.count,
                    0
                  )
                )}
              </h2>
            </div>
            <div className="divider"></div>
            <div>
              <button className="btn-proceed"> Proceed</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
