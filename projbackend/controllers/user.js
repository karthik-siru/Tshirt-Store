const { find } = require("../models/user");
const User = require("../models/user");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  // TODO comeback here for password
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "You are not authorised to update this user",
        });
      }
      user.profile.salt = undefined;
      user.profile.encry_password = undefined;
      user.profile.createdAt = undefined;
      user.profile.updatedAt = undefined;
      return res.json(user);
    }
  );
};
