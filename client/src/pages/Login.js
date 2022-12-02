import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { login } from "../redux/actions/auth";

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const { email, password } = formData;

    const onSubmit = async (e) => {
        e.preventDefault();
        login({ email, password });
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
                    <p className="h3 mb-2 text-secondary">Login</p>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                name="email"
                                value={email}
                                placeholder={"example@email.com"}
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
                                placeholder={"Password"}
                                onChange={(e) => onChange(e)}
                                type="password"
                                className="form-control"
                                id="password"
                                required
                            ></input>
                            <div
                                id="passwordHelpBlock"
                                className="form-text text-secondary"
                            >
                                Your password must be 6-20 characters long, contain letters and numbers.
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn color-orange w-100 mt-1"
                        >
                           <i className="bi bi-box-arrow-in-right mr-2"></i>Login
                        </button>
                    </form>
                    <p className="mt-4"> {"If you don't have an account ? "}
                        <Link to="/register">
                            click here to create new account
                        </Link>
                    </p>
                </div>
            </div>

            <hr />
            <h5>Fore development</h5>
            <p>
                - Make sure you added ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASS in
                .env file, it will create admin user automatically
            </p>
            <p>
                - Login with admin user have access to admin panel. Only admin
                can give permission to sell product on website
            </p>
            <p>
                - login from seller account to add product to database and rest
                of all account should be considered as buyer.
            </p>
            <p>
                - Highly recommended to first read the{" "}
                <a
                    href="https://github.com/dharmeshphd/my-store/"
                    className="text-danger"
                >
                    {" "}
                    README.md{" "}
                </a>
                file
            </p>
            <p>
                - If you get error make sure that mongodb database is connected
                and terminal showing "Mongodb database connected successfully"
            </p>
            <p></p>
            <p className="mt-4">
                <a
                    href="https://github.com/dharmeshphd/my-store/"
                    className="text-secondary"
                >
                    Click here to goto github for further information
                </a>
            </p>
        </section>
    );
};

Login.protoTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
