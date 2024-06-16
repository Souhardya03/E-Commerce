const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true
  },
  cart:{
    type:Array,
  }  
});
const Orders = mongoose.model("Orders", orderSchema);
module.exports = Orders;
