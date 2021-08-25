const express = require("express");
const router = express.Router();

const { getUserById } = require("../controllers/user");
const { getUser } = require("../controllers/user");
const { updateUser, userPurchaseList } = require("../controllers/user");

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

router.put("/user/:userId", isSignedIn , isAuthenticated ,updateUser);
router.get("/orders/user/:userId", isSignedIn , isAuthenticated ,userPurchaseList);

module.exports = router;
