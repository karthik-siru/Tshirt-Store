const crypto = require("crypto");
const uuidv1 = require("uuid/v1");
const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 32,
      trim: true,
    },

    lastName: {
      type: String,
      maxLength: 32,
      trim: true,
    },

    email: {
      type: String,
      maxLength: 100,
      required: true,
      unique: true,
    },

    userinfo: {
      type: String,
      trim: true,
    },

    // work TODO here
    encry_password: {
      type: String,
      required: true,
    },
    salt: String,

    role: {
      type: Number,
      default: 0,
    },
    purchases: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

//virtuals for encrypted password

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenthicate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },

  securePassword: function (plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

// now we have to export the schema .
// how to call , schema
module.exports = mongoose.model("User", userSchema);
