import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import {
  createCategory,
  getCategory,
  UpdateCategory,
} from "./helper/adminapicall";

const UpdatemyCategory = ({ match }) => {
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

  const preload = (categoryId) => {
    getCategory(categoryId).then((data) => {
      if (data && data.err) {
        setError(true);
        console.log(data.err);
      } else {
        setName(data.name);
      }
    });
  };

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    // backend req fired
    UpdateCategory(match.params.categoryId, user._id, token, { name }).then(
      (data) => {
        if (data && data.err) {
          setError(data.err);
        } else {
          console.log("in else form bro ");
          setError("");
          setSuccess(true);
        }
      }
    );
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">CATEGORY UPDATED SUCCESSFULLY</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-warning">FAILED TO UPDATE CATEGORY</h4>;
    }
  };

  const categoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <input
            type="text"
            className="form-control my-3"
            onChange={handleChange}
            autoFocus
            required
            value={name}
          />
          <button className="btn btn-outline-info" onClick={onSubmit}>
            Update Category
          </button>
        </div>
      </form>
    );
  };

  return (
    <Base
      title="Update a Category"
      description="apply changes for categories"
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

export default UpdatemyCategory;
