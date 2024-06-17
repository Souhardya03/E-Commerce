const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: {
      type: String,
      lowercase: true,
    },
    brandname: {type:String, required:true},
    description: { type: String, required: true },
    finalprice: { type: Number, required: true },
    originalprice: { type: Number, required: true },
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
    },
    quantity: { type: Number, required: true },
    photo: {type: Array},
    topProduct: {type: Boolean},
    featuredProduct: {type: Boolean},
    heroProduct: {type:Boolean},
    info: {type:String},
    shipping: { type: Boolean },
  },
  { timestamps: true }
);
const Products = mongoose.model("Products", ProductSchema);
module.exports = Products;
