require("dotenv").config();
const express = require("express")
const cors = require("cors");
const app = express();
const authRoute = require("./routes/authRoute.js")
const categoryRoute = require("./routes/categoryRoute.js")
const productRoute = require("./routes/productRoute.js")
const imageRoute = require("./routes/imageRouter.js")
const connectDB = require("./config/db.js")
connectDB();
const corsoption = {
    origin : "https://e-commerce-admin-pied.vercel.app",
    methods : "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials : true, 
}
app.use(cors(corsoption))
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