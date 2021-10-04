import { API } from "../../backend";

import React from "react";

export const getProducts = () => {
  return fetch(`${API}/product/all`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
