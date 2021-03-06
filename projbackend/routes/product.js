const express = require("express");
const router = express.Router();

const {
  getProductById,
  createProduct,
  getProduct,
  photo,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getAllUnqCategories,
} = require("../controllers/product");

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

// get all routes
router.get("/product/all", getAllProducts);
router.get("/product/categories", getAllUnqCategories);

// read routes
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

// delete routes
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

// update routes
router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

module.exports = router;
