const Product = require("../models/product");
const formidable = require("fromidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "PRODUCT not found in DB",
        });
      }

      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  let form = formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "UNABLE TO CREATE PRODUCT",
      });
    }

    // Destructuring the feilds.
    const { price, name, description, category, stock } = fields;

    if (!name || !description || !price || !stock) {
      res.status(400).json({
        error: "PLEASE CHECK THE DETAILS..",
      });
    }

    let product = new Product(fields);

    // Handle file here
    if (file.photo) {
      if (file.photo.size > 3145728) {
        return res.status(400).json({
          error: "FILE SIZE TOO BIG ",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.type = file.photo.type;
    }

    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "SAVING PHOTO IN DB FAILED ",
        });
      }
      res.json(product);
    });
  });
};
