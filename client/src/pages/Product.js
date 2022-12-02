import React from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { addProductToCart } from "../redux/actions/cart";
import { PropTypes } from "prop-types";


export const Product = ({cart, addProductToCart}) => {
  let cart_products = cart.products;

  const location = useLocation();

  return (
    <div className="container">
      <h1 className="mt-4">{location.state.name}</h1>
      <div className="row">
        <div className="col-md-6">
          <img
            className="card-img-top "
            src={location.state.image}
            alt="Card"
          ></img>
        </div>
        <div className="col-md-6">
          <h5 className="card-text mt-0 mb-0 text-info">
            {location.state.name}
          </h5>
          <p className="card-text mt-0 mb-0 text-secondary">
            {"Price : ₹"}
            {location.state.price}
          </p>
          <p className="card-text mt-0 mb-0">{location.state.description}</p>
          <button
            className="btn btn-outline-success mb-2 w-100 btn-sm"
            onClick={(e) => {
              alert("Order submitted");
            }}
          >
            Order
          </button>
          <br></br>
          <button
            className="btn btn-outline-info w-100 btn-sm"
            onClick={(e) => {
              cart_products.push(location.state)
              addProductToCart(cart_products);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

Product.protoTypes = {
  addProductToCart: PropTypes.func.isRequired,
  cart: PropTypes.object,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});


export default connect(mapStateToProps, {addProductToCart})(Product);
