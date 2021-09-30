import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const goBack = () => {
    return (
      <div className="md-5">
        <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
          Admin Home
        </Link>
      </div>
    );
  };

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    // backend req fired
    createCategory(user._id, token, { name }).then((data) => {
      if (data && data.err) {
        setError(true);
      } else {
        console.log("in else form bro ");
        setName("");
        setError("");
        setSuccess(true);
      }
    });
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">category created sucessfully</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-warning">failed to create category</h4>;
    }
  };

  const categoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead">Enter the Category</p>
          <input
            type="text"
            className="form-control my-3"
            onChange={handleChange}
            autoFocus
            required
            placeholder="Ex: Summer"
            value={name}
          />
          <button className="btn btn-outline-info" onClick={onSubmit}>
            Create Category
          </button>
        </div>
      </form>
    );
  };

  return (
    <Base
      title="Create a Category"
      description="Add a new category for tshirts"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {categoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
