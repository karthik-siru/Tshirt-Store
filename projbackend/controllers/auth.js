const User = require("../models/user");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      err: errors.array()[0].msg,
      param: errors.array()[0].param,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "EMAIL ALREADY IN USE ",
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  // if there are errors... return back
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      err: errors.array()[0].msg,
      param: errors.array()[0].param,
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        err: "User doesnot , exists ",
      });
    }

    if (!user.authenthicate(password)) {
      return res.status(401).json({
        err: "Email and Password doesn't  match ",
      });
    }
    // create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    // put the token in cookie
    res.cookie("token", token, { expire: new Date() + 99999 });

    //send response to the frontend
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  // clear the cookie
  res.clearCookie("token");
  res.json({
    err: "user signed out ",
  });
};

//protected -routes :

exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});

///custom -middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      err: "ACCESS DENIED ",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      err: "YOU ARE NOT A ADMIN ",
    });
  }
  next();
};
