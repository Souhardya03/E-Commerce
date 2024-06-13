const multer = require("multer");
const path = require("path");
const express = require("express");
const router = express.Router();
const fs = require('fs');
const authMiddlewares = require("../middlewares/authMiddlewares.js");
const imageController = require("../controllers/imageController.js");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = '/tmp/uploads/images';
    fs.mkdir(uploadDir, { recursive: true }, (err) => {
      if (err) {
        console.error('Error creating directory:', err);
        return cb(err, uploadDir);
      }
      cb(null, uploadDir); // use /tmp directory
    });
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
