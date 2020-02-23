import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";
import img from "../img/fav.png";


const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#ff9900" };
    } else {
        return { color: "#000" };
    }
};

const Menu = ({ history }) => (
    <div id='menu' className="container row mt-3 border-0">

        <div id='fav' className="col-lg-3 col-md-3 col-sm-3 text-center">
            <img id='fav' src={img} alt="img"/>
        </div>
        <div className="col-lg-8 col-md-8 col-sm-8 text-center  pr-0">
            <ul id='nav1' className="nav nav-tabs text-dark bg-white  ">


                <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={isActive(history, "/")}
                        to="/"
                    >
                        Home
                </Link>
                </li>

                <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={isActive(history, "/shop")}
                        to="/shop"
                    >
                        Shop
                </Link>
                </li>

                <li className="nav-item">
                    <Link
                        className="nav-link cart-icon"
                        style={isActive(history, "/cart")}
                        to="/cart"
                    >
                        <i className="fas fa-shopping-cart"></i>{' '}
                        <sup> <span className='item-count'>{itemTotal()}</span></sup>
                    </Link>
                </li>

                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/user/dashboard")}
                            to="/user/dashboard"
                        >
                            Dashboard
                    </Link>
                    </li>
                )}

                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/admin/dashboard")}
                            to="/admin/dashboard"
                        >
                            Dashboard
                    </Link>
                    </li>
                )}

                {!isAuthenticated() && (
                    <Fragment>
                        <li className="nav-item">

                        </li>

                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                style={isActive(history, "/signup")}
                                to="/signup"
                            >
                                Enter
                        </Link>
                        </li>
                    </Fragment>
                )}

                {isAuthenticated() && (
                    <li className="nav-item">
                        <span
                            className="nav-link text-dark"
                            style={{ cursor: "pointer", color: "#ffffff" }}
                            onClick={() =>
                                signout(() => {
                                    history.push("/");
                                })
                            }
                        >
                            Logout
                    </span>
                    </li>
                )}
            </ul>
        </div>
    </div>
);

export default withRouter(Menu);