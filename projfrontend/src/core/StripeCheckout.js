import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import { Link } from "react-router-dom";
const StripeCheckout = (products, setreload = (f) => f, reload = undefined) => {
  const [data, setdata] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getFinalPrice = () => {
    let amount = 0;
    if (products && products.length > 0) {
      products.map((p) => {
        amount += p.price;
      });
    }
    return amount;
  };

  return (
    <div>
      <h3 className="text-white">Stripe Checkout loaded {getFinalPrice()} </h3>
    </div>
  );
};

export default StripeCheckout;
