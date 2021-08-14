const express = require("express");
const router = express.Router();

// throw a request

router.get("/signout", (req, res) => {
   res.send("User signed out ");
});

module.exports = router;
