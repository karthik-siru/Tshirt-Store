const express = require("express");
const router = express.Router();

const { getProductById, createProduct } = require("../controllers/product");

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

// we need to check whether he is logged in or not and isAdmin or not

router.param("userId", getUserById);
router.param("productId", getProductById);

//  actual routes

router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

module.exports = router;
