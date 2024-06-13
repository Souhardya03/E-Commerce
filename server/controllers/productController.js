const { default: slugify } = require("slugify");
const ProductModel = require("../models/productModel.js");
const fs = require("fs");
const createProduct = async (req, res) => {
  try {
    const {
      name,
      finalprice,
      originalprice,
      category,
      quantity,
      shipping,
      photo,
      topProduct,
      description,
      featuredProduct,
      info
    } = req.body;
    const Products = await ProductModel.create({ name, slug: slugify(name),finalprice,originalprice,category,quantity,shipping,description,photo,topProduct,featuredProduct,info });
    return res.status(200).json({ message: "Created Successfully", data: Products });
  } catch (error) {
    console.log(error);
    console.log("error from create product");
  }
};

const getAllProducts = async (req, res) => {
  try {
    const data = await ProductModel.find();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    console.log("Error from all products");
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await ProductModel.findById(id).select("-photo");
    return res.status(200).json({ message: "Product Found", data: data });
  } catch (error) {
    console.log(error);
    console.log("Error from single product");
  }
};
const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await ProductModel.deleteOne({ _id: id });
    return res.status(200).json({ message: "Product Deleted" });
  } catch (error) {
    console.log(error);
    console.log("Error From Delete Product");
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
};
