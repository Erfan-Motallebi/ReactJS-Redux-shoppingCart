import React, { Component } from "react";
import currencyFormat from "../utils";
import Fade from "react-reveal/Fade";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProceedBtn: false,
      removeState: false,
      name: "",
      email: "",
      address: "",
      total: 0,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmitOrder = (e) => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems,
      total: this.state.total,
    };
    this.props.createOrder(order);
  };

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
          <Fade left cascade>
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
                        $ {item.count} x {item.price}
                        <button
                          className="cart-btn"
                          onClick={() => {
                            this.props.removeCart(item);
                            this.setState({
                              removeState: true,
                            });
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Fade>
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
              <button
                onClick={() => {
                  this.setState({
                    showProceedBtn: !this.state.showProceedBtn,
                    total: currencyFormat(
                      cartItems.reduce(
                        (totalVal, currentVal) =>
                          totalVal + currentVal.price * currentVal.count,
                        0
                      )
                    ),
                  });
                }}
                className="btn-proceed"
              >
                {" "}
                Proceed
              </button>
            </div>
          </div>
        )}
        {this.state.showProceedBtn && (
          <Fade cascade right>
            <div className="form">
              <form onSubmit={this.handleSubmitOrder}>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your name"
                  onChange={this.handleChange}
                  value={this.state.name}
                  required
                />{" "}
                <br />
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your email"
                  onChange={this.handleChange}
                  value={this.state.email}
                  required
                />{" "}
                <br />
                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Your address"
                  onChange={this.handleChange}
                  value={this.state.address}
                  required
                />{" "}
                <br />
                <br />
                <br />
                <button className="btn-proceed left" type="submit">
                  CheckOut
                </button>
              </form>
            </div>
          </Fade>
        )}
      </div>
    );
  }
}
