const multer = require("multer");
const path = require("path");
const express = require("express");
const router = express.Router();
const fs = require('fs');
const authMiddlewares = require("../middlewares/authMiddlewares.js");
const imageController = require("../controllers/imageController.js");

// Ensure the /tmp/uploads/images directory exists
const uploadDir = '/tmp/uploads/images';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // use /tmp directory
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/upload",
  authMiddlewares.requireSignIn,
  authMiddlewares.isAdmin,
  upload.array('product', 4),
  imageController.uploadImage
);

module.exports = router;
