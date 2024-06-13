require("dotenv").config();
const express = require("express")
const connectDB = require("./config/db.js")
const app = express();
const cors = require("cors");
const authRoute = require("./routes/authRoute.js")
const categoryRoute = require("./routes/categoryRoute.js")
const productRoute = require("./routes/productRoute.js")
const imageRoute = require("./routes/imageRouter.js")
connectDB();
app.use(cors())
app.use(express.json());

//Routes
app.use("/api/auth", authRoute);
app.use("/api/auth", categoryRoute);
app.use("/api/auth", productRoute);
app.use("/api/auth", imageRoute);
app.use("/images",express.static('uploads/images'));

app.get("/",(req,res)=>{
    res.send({message:"Welcome To E-Commerce Backend"});
})
const port = process.env.PORT || 8000;
console.log(`Server is running at http://localhost:${port}`);
app.listen(port);