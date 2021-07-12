import React, { Component } from "react";
import currencyFormat from "../utils";
import Fade from "react-reveal/Fade";
import Flash from "react-reveal/Flash";
import Bounce from "react-reveal/Bounce";
import Zoom from "react-reveal/Zoom";
import Modal from "react-modal";

export default class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productShowModal: false,
      product: null,
    };
    this.showModel = this.showModel.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addProduct = this.addProduct.bind(this);
  }

  showModel() {
    this.setState({
      productShowModal: true,
    });
  }
  closeModal() {
    this.setState({
      productShowModal: false,
    });
  }

  addProduct(product) {
    this.setState({
      product: product,
    });
  }

  render() {
    const customStyle = {
      content: {
        width: "80%",
        height: "70%",
        top: "10%",
        left: "10%",
      },
    };
    return (
      <div>
        <Fade bottom cascade duration={2500}>
          <ul className="products">
            {this.props.products.map((product) => {
              return (
                <li key={product._id}>
                  <div className="product">
                    <a
                      href={"#" + product._id}
                      onClick={() => {
                        this.showModel();
                        this.addProduct(product);
                      }}
                    >
                      <img src={product.image} alt={product.title} />
                      <p>{product.title}</p>
                    </a>
                    <div className="product-price">
                      <div>
                        <h3>$ {product.price}</h3>
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
        </Fade>
        {this.state.productShowModal && (
          <Modal
            isOpen={true}
            onRequestClose={this.closeModal}
            style={customStyle}
          >
            <Zoom>
              <button
                type="button"
                className="close-modal"
                onClick={this.closeModal}
              >
                X
              </button>
              <div className="product-details">
                <section>
                  <img
                    src={this.state.product.image}
                    alt={this.state.product.title}
                  />
                </section>
                <section className="details">
                  <h2>{this.state.product.title}</h2>
                  <p className="product-description">
                    {this.state.product.description}
                  </p>
                  <span>
                    <strong>Available Sizes</strong>{" "}
                    {this.state.product.availableSizes.map((size) => {
                      return (
                        <Bounce cascade right duration={3000} delay={500}>
                          <span>
                            {" "}
                            <button className="btn-size">{size}</button>{" "}
                          </span>
                        </Bounce>
                      );
                    })}
                  </span>
                  <div className="btn-modal">
                    <strong>
                      <Flash delay={2000} duration={2000} count={2}>
                        <div style={{ marginTop: "7px", fontSize: "2rem" }}>
                          $ {currencyFormat(this.state.product.price)}
                        </div>
                      </Flash>
                    </strong>
                    <button
                      className="btn-proceed"
                      onClick={() => {
                        this.props.addToCart(this.state.product);
                        this.closeModal();
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </section>
                );
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}
