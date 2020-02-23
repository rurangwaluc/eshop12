import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
    const {
        user: { _id, name, email, role }
    } = isAuthenticated();

    const adminLinks = () => {
        return (
            <div className="card ">
              
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link text-warning" to="/create/category">
                            Create Category
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link text-warning" to="/create/product">
                            Create Product
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link text-warning" to="/admin/orders">
                            View Orders
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link text-warning" to="/admin/products">
                            Manage Products
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };

    const adminInfo = () => {
        return (
            <div className="card mb-5 ">
                <h3 className="card-header">User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item font-weight-bold">{name}</li>
                    <li className="list-group-item font-italic">{email}</li>
                    <li className="list-group-item">
                        {role === 1 ? "Admin" : "Registered User"}
                    </li>
                </ul>
            </div>
        );
    };

    return (
        <Layout
            title="Dashboard"
            description={`Welcome ${name}!`}
            className="container"
        >
            <div className="row">
                <div className="col-md-6 mb-4">{adminLinks()}</div>
                <div className="col-md-6">{adminInfo()}</div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;