const Product = require("../models/product");
const formidable = require("formidable");
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
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "UNABLE TO CREATE PRODUCT",
      });
    }

    console.log(fields);

    // Destructuring the feilds.
    const { name, description, price, category, stock } = fields;

    if (!name || !description || !price || !stock || !category) {
      return res.status(400).json({
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
      product.photo.contentType = file.photo.type;
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
