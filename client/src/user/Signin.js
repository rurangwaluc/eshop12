import React, { useState } from "react";
import { Redirect } from "react-router-dom";
// import Layout from "../core/Layout";
// import Menu from "../core/Menu";
import Spinner from 'react-bootstrap/Spinner';


import { signin, authenticate, isAuthenticated } from "../auth";


const Signin = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, loading, error, redirectToReferrer } = values;
    const { user } = isAuthenticated();

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                });
            }
        });
    };

    const signUpForm = () => (

        <form>
            <div className="row register-form">

                <div id='in' className="col-md-12">
                    <h3 className="register-h mb-3">Login</h3>

                    <div id='f' className="form-group ">
                        <input
                            onChange={handleChange("email")}
                            type="email"
                            className="form-control "
                            placeholder="Email *"
                            value={email} />
                    </div>
                    <div id='f' className="form-group">
                        <input
                            onChange={handleChange("password")}
                            type="password"
                            className="form-control"
                            placeholder="Password *"
                            value={password}
                        />
                    </div>
                    <input
                        onClick={clickSubmit}
                        type="submit"
                        className="btnRegister "
                        value="Login" />

                </div>
            </div>

        </form>
    );

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    const showLoading = () =>
        loading && (
            <Spinner animation='border' role='status'>
            <span className='sr-only'>Loading...</span>
             </Spinner>
        );

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />;
            } else {
                return <Redirect to="/user/dashboard" />;
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    };

    return (
        <div>

            <div
                title="Signin"
                description="Signin to Node React E-commerce App"
                className="container col-md-12 offset-md-2 m-5"
            >
                {showLoading()}
                {showError()}
                {signUpForm()}
                {redirectUser()}
            </div>
        </div>
    );
};

export default Signin;