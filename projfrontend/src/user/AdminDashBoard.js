import React from "react";
import { Link } from "react-router-dom";

import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";

const AdminDashBoard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const adminLeftPanel = () => {
    return (
      <div className="card" style={{ marginLeft: "9px" }}>
        <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
        <ul className="List-group" style={{ padding: "0px" }}>
          <li className="List-group-item">
            <Link
              to="/admin/create/category"
              className="nav-link"
              style={{ color: "#212529" }}
            >
              Create Categories
            </Link>
            <Link
              to="/admin/categories"
              className="nav-link"
              style={{ color: "#212529" }}
            >
              Manage Categories
            </Link>
            <Link
              to="/admin/create/product"
              className="nav-link"
              style={{ color: "#212529" }}
            >
              Create Product
            </Link>
            <Link
              to="/admin/products"
              className="nav-link"
              style={{ color: "#212529" }}
            >
              Manage Products
            </Link>
            <Link
              to="/admin/orders"
              className="nav-link"
              style={{ color: "#212529" }}
            >
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightPanel = () => {
    return (
      <div className="card" style={{ marginRight: "9px" }}>
        <h4 className="card-header bg-dark text-white">Admin Information</h4>
        <ul className="list-group" style={{ textAlign: "start" }}>
          <li className="list-group-item">
            <span
              className="badge bg-warning mr-2"
              style={{ color: "#212529" }}
            >
              Name:{" "}
            </span>{" "}
            {name}
          </li>
          <li className="list-group-item">
            <span
              className="badge bg-warning mr-2"
              style={{ color: "#212529" }}
            >
              Email:{" "}
            </span>{" "}
            {email}
          </li>
          <li className="list-group-item">
            <span className="badge bg-danger" style={{ color: "#212529" }}>
              Admin Area
            </span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title="Welcome to Admin Area"
      description="Manage all of your Products here"
    >
      <div className="row">
        <div className="col-3">{adminLeftPanel()}</div>
        <div className="col-9">{adminRightPanel()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
