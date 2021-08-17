const { check, validationReq } = require("express-validator");
const express = require("express");
const router = express.Router();

const { signup, signout, signin } = require("../controllers/auth");

router.post(
  "/signup",
  [
    // validators
    check("name", "name should be at least 5 chars long").isLength({ min: 3 }),
    check("email", "Please provide a valid email ").isEmail(),
    check("password", "password mari ila pettav entra ").isLength({ min: 8 }),
  ],
  signup
);

router.post(
  "/signin",
  [
    // validators
    check("email", "Please provide a valid email ").isEmail(),
    check("password", "Please check your password").isLength({ min: 8 }),
  ],
  signin
);

// throw a request
router.get("/signout", signout);
module.exports = router;
