const multer = require("multer");
const path = require("path");
const express = require("express");
const router = express.Router();
const authMiddlewares = require("../middlewares/authmiddlewares.js");
const imageController = require("../controllers/imageController.js");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/images'));
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${file.originalname}`);
  }
});

const upload = multer({ storage });

router.post("/upload", authMiddlewares.requireSignIn, authMiddlewares.isAdmin, upload.array('product', 4), imageController.uploadImage);

module.exports = router;
