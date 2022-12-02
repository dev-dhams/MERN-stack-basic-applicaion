import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { deleteProductFromCart, clearCart } from "../redux/actions/cart";

function Cart({ cart, deleteProductFromCart, clearCart }) {
    return (
        <div className="container">
            <h1>My Cart</h1>
            <button
                className="btn btn-sm btn-warning mb-2"
                onClick={(e) => {
                    clearCart();
                }}
            >
                Clear Cart
            </button>
            <div className="row">
                {cart.products.map((p, index) => (
                    <div className="col-lg-3 col-md-4 card mb-4" key={index}>
                        <img
                            className="card-img-top"
                            src={p.image}
                            alt="card"
                        ></img>
                        <div className="card-body">
                            <h5 className="card-title mt-0 mb-0">{p.name}</h5>
                            <p className="card-text mt-0 mb-0 font-italic">
                                {"Price : ₹"}
                                {p.price}
                            </p>
                            <button className="btn btn-outline-info btn-sm mb-2 w-100">
                                Buy Now
                            </button>
                            <br></br>
                            <button
                                className="btn btn-outline-danger btn-sm w-100"
                                onClick={(e) => {
                                    cart.products.splice(index, 1);
                                    deleteProductFromCart(cart.products);
                                }}
                            >
                                Remove from Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

Cart.protoTypes = {
    cart: PropTypes.object,
    deleteProductFromCart: PropTypes.func.isRequired,
    clearCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    cart: state.cart,
});

export default connect(mapStateToProps, { deleteProductFromCart, clearCart })(
    Cart
);
