import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { getProducts } from "../redux/actions/product";
import Carousel from "../components/Carousel";
import { addProductToCart } from "../redux/actions/cart";

const Home = ({ productList, getProducts, auth, cart, addProductToCart }) => {
    let cart_products = cart.products;

    const navigate = useNavigate();

    useEffect(() => {
        getProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!auth.isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (auth.user.permissions.seller) {
        return <Navigate to="/products" />;
    }

    if (auth.user.permissions.admin) {
        return <Navigate to="/users" />;
    }

    return (
        <div className="container">
            <Carousel />
            <h4 className="mt-2 mb-2">For development</h4>
            <p>- To add product in database, login from seller account.</p>
            <p>
                - Any account can be converted to seller account only by admin.
            </p>
            <p>
                - To give a permissions to user to sell, login as admin, go to
                /users and select user and gave permission
            </p>
            <hr />
            <div className="row">
                {productList.map((p, index) => (
                    <div className="col-lg-3 col-md-4 card mb-4" key={index}>
                        <img
                            className="card-img-top "
                            src={p.image}
                            alt="Card cap"
                        ></img>
                        <div className="card-body">
                            <h5 className="card-title mt-0 mb-0 text-info">
                                {p.name}
                            </h5>
                            <p className="card-text mt-0 mb-0 text-secondary">
                                {"Price : ₹"}
                                {p.price}
                            </p>
                            {/* <p className="card-text mt-0 mb-0">{p.description}</p> */}
                            <button
                                className="btn btn-outline-success mb-2 w-100 btn-sm"
                                onClick={(e) => {
                                    navigate("/product", { state: p });
                                }}
                            >
                                Buy Now
                            </button>
                            <br></br>
                            <button
                                className="btn btn-outline-info w-100 btn-sm"
                                onClick={(e) => {
                                    cart_products.push(p);
                                    addProductToCart(cart_products);
                                }}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

Home.protoTypes = {
    getProducts: PropTypes.func.isRequired,
    addProductToCart: PropTypes.func.isRequired,
    auth: PropTypes.object,
    cart: PropTypes.object,
};

const mapStateToProps = (state) => ({
    productList: state.product.products,
    auth: state.auth,
    cart: state.cart,
});

export default connect(mapStateToProps, { getProducts, addProductToCart })(
    Home
);
