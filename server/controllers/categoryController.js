
const { default: slugify } = require("slugify");
const categoryModel = require("../models/categoryModel.js");

const createCategory = async (req, res) => {
  try {
    const { name, slug } = req.body;
    const existence = await categoryModel.findOne({"slug":slugify(name)});
    if (existence) {
      return res.status(400).json({ message: "This Category already exists" });
    }
    const newCat = await categoryModel.create({ name, slug:slugify(name) });
    res.status(200).json({ message: "Category created", category: newCat });
  } catch (error) {
    console.log(error);
    console.log("error from create category");
  }
};
const getAllCategories = async (req, res) => {
  try {
    const data = await categoryModel.find();
    return res
      .status(200)
      .json({ message: "All Categories", categories: data });
  } catch (error) {
    console.log(error);
    console.log("Error in getting all categories");
  }
};
const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await categoryModel.deleteOne({ _id: id });
    return res.status(200).json({ message: "Category Deleted Successfully" });
  } catch (error) {
    console.log(error);
    console.log("Error in deleting the category");
  }
};

const getSingleCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const catData = await categoryModel.findById(id);
    return res
      .status(200)
      .json({ message: "Category Found", category: catData });
  } catch (error) {
    console.log(error);
    console.log("Error from Single Category Side");
  }
};

module.exports = { createCategory, getAllCategories, deleteCategory, getSingleCategory };
