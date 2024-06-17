const Orders = require("../models/ordermodel");

//create order
const createOrder = async (req, res) => {
  try {
    const { userId, email, cart } = req.body;
    const order = await Orders.create({ userId, email, cart }); // Correct usage
    res.status(200).json({ message: "Order created", order }); // Corrected response
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creating order" });
  }
};

//display order
const displayorder = async(req,res)=>{
  try {
    const data = await Orders.find();
    res.status(200).json({ message: "Orders fetched", data });
  } catch (error) {
    console.log(error);
    console.log("Error from order controller of display order");
  }
}

//get single order by id
const getSingleOrder = async(req,res)=>{
  try {
    const id = req.params.id
    const data = await Orders.findOne({userId:id})
    res.status(200).json({ message: "Order fetched", data });
  } catch (error) {
    console.log(error);
    console.log("Error from getsingleorder order controller");
  }
}

//delete order by id
const deleteOrder = async(req,res)=>{
  try {
    const id = req.params.id;
    const result = await Orders.deleteOne({_id:id})
    res.status(200).json({ message: "Order deleted" });
  } catch (error) {
    console.log(error);
    console.log("Error from delete order");
  }
}


module.exports = { createOrder,displayorder,getSingleOrder,deleteOrder };
