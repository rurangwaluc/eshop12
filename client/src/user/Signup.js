import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { signup } from '../auth';
import Menu from "../core/Menu";
import Signin from './Signin'



const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: ' ',
        password: '',
        error: '',
        success: false
    });

    const { name, email, password, success, error } = values;

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const clickSubmit = e => {
        e.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                });
            }
        });
    };

    const signUpForm = () => (
        <form noValidate>

            <div id='in' className="container register mb-5 h-75">
                <div className="row">
                    <div className="col-md-3 register-left">
                        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
                        <h3>Welcome</h3>
                        <p>Please enter to purchase with Us</p>

                    </div>
                    <div className="col-md-9 register-right">
                        <ul className="nav nav-tabs nav-justified" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link lin active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Register</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link lin" id="login-tab" data-toggle="tab" href="#login" role="tab" aria-controls="login" aria-selected="false">Login</a>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <h3 className="register-heading mt-5 mb-1">Register</h3>
                                <div className="row register-form mt-0">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <input
                                                onChange={handleChange('name')}
                                                type="text"
                                                className="form-control"
                                                placeholder="Name *"
                                                value={name}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                onChange={handleChange('email')}
                                                type="email"
                                                className="form-control"
                                                placeholder="Email *"
                                                value={email}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                onChange={handleChange('password')}
                                                type="password"
                                                className="form-control"
                                                placeholder="Password *"
                                                value={password}
                                            />
                                        </div>
                                        <input
                                            onClick={clickSubmit}
                                            type="submit"
                                            className="btnRegister"
                                            value="Register" />

                                    </div>

                                </div>
                            </div>
                            <div className="tab-pane fade show"
                                id="login" role="tabpanel" aria-labelledby="login-tab">
                                <Signin />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            New account is created. Please <Link to="/signin">Signin</Link>
        </div>
    );

    return (
        <div>
            <Menu />
            <div className="container col-md-8 offset-md-2">
                <div className='text-center mt-3'>
                    <h1>Register/Login</h1>

                </div>
                {showSuccess()}
                {showError()}
                {signUpForm()}
            </div>
        </div>
    );
};

export default Signup;