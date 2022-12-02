import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { register } from "../redux/actions/auth";
import PropTypes from "prop-types";

const Register = ({ register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    });
    const { name, email, password, password2 } = formData;

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            alert("Conform password do not match", "danger");
        } else {
            register({ name, email, password });
        }
    };

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    if (isAuthenticated) {
        return <Navigate to="/" />;
    }

    return (
        <section className="container">
            <div className="row justify-content-md-center">
                <div className="col-md-6">
                <h4 className="mt-4 ">
                        <Link to="/" className="text-red">
                            <i className="bi bi-shop-window mr-2"></i>
                            My Shop
                        </Link>
                    </h4>
                    <p className="h3 mb-2 text-secondary">Register / Signup</p>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Name
                            </label>
                            <input
                                name="name"
                                value={name}
                                onChange={(e) => onChange(e)}
                                type="text"
                                className="form-control"
                                id="name"
                                aria-describedby="nameHelp"
                                required
                            ></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                name="email"
                                value={email}
                                onChange={(e) => onChange(e)}
                                type="email"
                                className="form-control"
                                id="email"
                                aria-describedby="email"
                            ></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                name="password"
                                value={password}
                                onChange={(e) => onChange(e)}
                                type="password"
                                className="form-control"
                                id="password"
                                minLength={6}
                                required
                            ></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password2" className="form-label">
                                Conform password
                            </label>
                            <input
                                name="password2"
                                value={password2}
                                onChange={(e) => onChange(e)}
                                type="password"
                                className="form-control"
                                id="password2"
                                minLength={6}
                                required
                            ></input>
                        </div>
                        <button
                            type="submit"
                            className="btn color-orange w-100 mt-1"
                        >
                            <i className="bi bi-person-add mr-2"></i>Register / Signup
                        </button>
                    </form>
                    <p className="mt-4">
                        If you already have an account{" "}
                        <Link to="/login">click here to login</Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

Register.propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Register);
