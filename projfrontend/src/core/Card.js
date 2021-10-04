import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import Imagehelper from "./helper/Imagehelper";
import { addItemtoCart } from "./helper/CartHelper";

export const Card = ({ product, addtoCart = true, removeFromCart = false }) => {
  const [redirect, setredirect] = useState(false);

  const [count, setcount] = useState(product.count);

  const CardTitle = product ? product.name : "A photo from pexel";
  const CardDescription = product
    ? product.description
    : "A nice photo basically";
  const CardPrice = product ? product.price : "DEFAULT";

  const addtoCartHelper = () => {
    addItemtoCart(product, () => {
      setredirect(true);
    });
  };

  const getRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddtoCart = (addtoCart) => {
    return (
      addtoCart && (
        <button
          onClick={addtoCartHelper}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {}}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{CardTitle}</div>
      <div className="card-body">
        {getRedirect(redirect)}
        <Imagehelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap text-center ">
          {CardDescription}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">Rs.{CardPrice}</p>
        <div className="row">
          <div className="col-12">{showAddtoCart(addtoCart)}</div>
          <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
