const express = require("express");
const router = express.Router();
const Product = require("../../models/productSchema");
const authorize = require("../../middleware/authorize");

// @route  POST api/products
// @desc   Add new product into database
// @access Only SELLER
router.post("/products", authorize, async (req, res) => {
  if (!req.user.permissions.seller) {
    return res.status(401).json({ errors: [{ msg: "Unauthorized" }] });
  }
  try {
    let product = new Product({
      seller: req.user.id,
      name: req.body['name'],
      image: req.body.image,
      price: req.body.price,
      category: req.body.category,
      description: req.body.description,
      quantity: req.body.quantity,
    });
    product.save();
    return res.status(200).json(product);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  }
});

// @route  GET api/products
// @desc   Get single products
router.get("/products/:id", async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(500)
        .json({ errors: [{ msg: "Internal Server Error" }] });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  }
});

// @route  GET api/products
// @desc   Get all products
router.get("/products", async (req, res) => {
  try {
    let products = await Product.find({ isDeleted: false});
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  }
});

// @route  PATCH api/products
// @desc   Update product details
// @access Only Seller
router.patch("/products", authorize, async (req, res) => {
  let newProduct = {
    ...req.body.product,
  };
  try {
    let product = await Product.findById(newProduct._id);
    if (!product) {
      return res
        .status(500)
        .json({ errors: [{ msg: "Internal Server Error" }] });
    }
    if (req.user.id !== product.seller.toString()) {
      return res.status(401).json({ errors: [{ msg: "Unauthorized" }] });
    }
    product.name = newProduct.name;
    product.image = newProduct.image;
    product.price = newProduct.price;
    product.category = newProduct.category;
    product.description = newProduct.description;
    product.quantity = newProduct.quantity;
    product.isDeleted = newProduct.isDeleted;
    product.save();
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: "Unauthorized" }] });
  }
});

// @route  PATCH api/products
// @desc   Update product details
// @access Only Seller
router.delete("/products/:id", authorize, async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(500)
        .json({ errors: [{ msg: "Internal Server Error" }] });
    }
    if (req.user.id !== product.seller.toString()) {
      return res.status(401).json({ errors: [{ msg: "Unauthorized" }] });
    }
    product.delete();
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  }
});

module.exports = router;
