const multer = require("multer");
const path = require("path");
const express = require("express")
const router = express.Router();
const authMiddlewares =require( "../middlewares/authmiddlewares.js");
const imageController = require("../controllers/imageController.js")
const storage = multer.diskStorage({
  destination: "./uploads/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${file.originalname}`
    );
  },
});
const upload = multer({storage:storage})
router.post("/upload",authMiddlewares.requireSignIn,authMiddlewares.isAdmin,upload.array('product',4),imageController.uploadImage)
module.exports=router