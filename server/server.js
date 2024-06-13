require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./routes/authRoute.js");
const categoryRoute = require("./routes/categoryRoute.js");
const productRoute = require("./routes/productRoute.js");
const imageRoute = require("./routes/imageRouter.js");
const connectDB = require("./config/db.js");

connectDB();

const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, 
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/products", productRoute);
app.use("/api/images", imageRoute);
app.use("/images", express.static('uploads/images'));

app.get("/", (req, res) => {
    res.send({ message: "Welcome To E-Commerce Backend" });
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
