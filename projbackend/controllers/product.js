const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { filter } = require("lodash");

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

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "UNABLE TO FETCH PRODUCT",
      });
    }
    // updation part done by this two lines
    let product = req.product;
    product = _.extend(product, fields);

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
          error: "UPDATION OF PRODUCT FAILED ",
        });
      }
      res.json(product);
    });
  });
};

exports.deleteProduct = (req, res) => {
  const product = req.product;
  product.remove((err, deletedproduct) => {
    if (err) {
      return res.status(400).json({
        error: "FAILED TO DELETE THE PRODUCT",
      });
    }
    res.json({
      message: " PRODUCT DELETED SUCESSFULLY",
      deletedproduct,
    });
  });
};

// product listing :
exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.limit ? req.query.limit : "_id";

  Product.find()
    .select("-photo")
    .populate("category")
    .limit(limit)
    .sort([[sortBy, "asc"]])
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "NO PRODUCTS FOUND ",
        });
      }
      res.json(products);
    });
};

// Middleware
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.prodcuts.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { stock: -prod.count, sold: +prod.count },
      },
    };
  });

  Product.bulkWrite(myOperations, {}, (err, products) => {
    return res.status(400).json({
      error: "BULK OPERATION FAILED",
    });
  });
  next();
};
