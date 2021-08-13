const express = require("express");

const app = express();

const port = 8001;

app.get("/", (req, res) => {
  return res.send("hello mowa ");
});

// admin request using middle--ware

//middleware

const isLogged = (req, res,next) => {
  console.log("yes logged in");
  next();
};

const isAdmin = (req, res, next) => {
  console.log("Admin check ");
  next();
};

const admin = (req, res ) => {
  return res.send("Welcome Admin");
};

app.get("/admin", isLogged, isAdmin, admin);

app.get("/login", (req, res) => {
  return res.send("This is a login page  ");
});

app.listen(port, () => {
  console.log("server is up and running  ... ");
});
