import React, { Component } from "react";

export default class Filter extends Component {
  render() {
    return (
      <div>
        <div className="filter">
          <h3>{this.props.count} Products</h3>
          <div className="filter-order">
            <strong>Order </strong>
            <select value={this.props.sort} onChange={this.props.productOrder}>
              <option>Latest</option>
              <option value="lowest">Lowest</option>
              <option value="highest">Highest</option>
            </select>
          </div>
          <div className="filter-size">
            <strong>Filter </strong>
            <select value={this.props.size} onChange={this.props.productFilter}>
              <option value="">ALL</option>
              <option value="SM">SM</option>
              <option value="MD">MD</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
              <option value="XXXL">XXXL</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}
