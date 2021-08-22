const express = require("express");
const router = express.Router();

const { getUserById } = require("../controllers/user");
const { getUser } = require("../controllers/auth");

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn , isAuthenticated, getUser);

module.exports = router;
