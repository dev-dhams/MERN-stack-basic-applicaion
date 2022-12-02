import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import axios from "axios";
import { getProducts, deleteProduct } from "../redux/actions/product";

function Products({ auth, getProducts, productList, deleteProduct }) {
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        price: 0,
        category: "Electronics",
        description: "",
        quantity: 0,
    });

    const { name, image, price, category, description, quantity } = formData;
    const onSubmit = async (e) => {
        e.preventDefault();
        const body = JSON.stringify({
            name,
            image,
            price,
            category,
            description,
            quantity,
        });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            // const res = await axios.post("/api/products", body, config);
            await axios.post("/api/products", body, config);
            setFormData({
                name,
                image,
                price,
                category,
                description,
                quantity,
            });
            getProducts();
        } catch (err) {
            console.log(err);
        }
    };

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    useEffect(() => {
        getProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!auth.user.permissions.seller) {
        return <Navigate to="/" />;
    }

    return (
        <div className="container">
            <h2 className="mt-4">Add new product</h2>
            <hr />
            <form onSubmit={(e) => onSubmit(e)}>
                <div className="row">
                    {/* Product name */}
                    <div className="mb-3 col">
                        <label htmlFor="name" className="form-label">
                            Name
                        </label>
                        <input
                            name="name"
                            placeholder="Product name"
                            value={name}
                            onChange={(e) => onChange(e)}
                            type="name"
                            className="form-control"
                            id="name"
                            aria-describedby="name"
                            required
                        ></input>
                    </div>

                    {/* Product image */}
                    <div className="mb-3 col">
                        <label htmlFor="image" className="form-label">
                            Image
                        </label>
                        <input
                            name="image"
                            placeholder="Product image link"
                            value={image}
                            onChange={(e) => onChange(e)}
                            type="text"
                            className="form-control"
                            id="image"
                            aria-describedby="image"
                            required
                        ></input>
                    </div>
                </div>

                <div className="row">
                    {/* Product price */}
                    <div className="mb-3 col">
                        <label htmlFor="price" className="form-label">
                            Price
                        </label>
                        <input
                            name="price"
                            placeholder="Product price"
                            value={price}
                            onChange={(e) => onChange(e)}
                            type="number"
                            className="form-control"
                            id="price"
                            aria-describedby="price"
                            required
                        ></input>
                    </div>
                    {/* Product quantity */}
                    <div className="mb-3 col">
                        <label htmlFor="quantity" className="form-label">
                            Quantity
                        </label>
                        <input
                            name="quantity"
                            placeholder="Product quantity"
                            value={quantity}
                            onChange={(e) => onChange(e)}
                            type="number"
                            className="form-control"
                            id="quantity"
                            aria-describedby="quantity"
                            required
                        ></input>
                    </div>

                    {/* Product category */}
                    <div className="mb-3 col">
                        <label htmlFor="category" className="form-label">
                            Category
                        </label>
                        <select
                            name="category"
                            placeholder="Category of product in rupees"
                            defaultValue={category}
                            onChange={(e) => onChange(e)}
                            className="form-control"
                            id="category"
                            aria-describedby="category"
                        >
                            <option defaultValue="Electronics">
                                Electronics
                            </option>
                            <option value="Fashion">Fashion</option>
                            <option value="Grocery">Grocery</option>
                        </select>
                    </div>
                </div>

                {/* Product description */}
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <input
                        name="description"
                        placeholder="Product description"
                        value={description}
                        onChange={(e) => onChange(e)}
                        type="description"
                        className="form-control"
                        id="description"
                        aria-describedby="description"
                        required
                    ></input>
                </div>
                <button type="submit" className="btn btn-primary">
                    + Add
                </button>
            </form>

            <h2 className="mt-4">List of products</h2>
            <hr />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Sr. No.</th>
                        <th scope="col">Name of product</th>
                        <th scope="col">Price</th>
                        <th scope="col">Category</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {productList.map((p, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{p.name}</td>
                            <td>{p.price}</td>
                            <td>{p.category}</td>
                            <td>{p.quantity}</td>
                            <td>
                                <button
                                    onClick={(e) => deleteProduct(p._id)}
                                    className="btn btn-danger"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

Products.protoTypes = {
    deleteProduct: PropTypes.func.isRequired,
    getProducts: PropTypes.func.isRequired,
    auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    productList: state.product.products,
});

// export default Products;
export default connect(mapStateToProps, { getProducts, deleteProduct })(
    Products
);
