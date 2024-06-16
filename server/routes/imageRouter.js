const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const express = require('express');
const router = express.Router();
const authMiddlewares = require('../middlewares/authmiddlewares.js');
const imageController = require('../controllers/imageController.js');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'product_images', // Optional - specify a folder in Cloudinary
    format: async (req, file) => 'jpg', // Optional - formats available
    public_id: (req, file) => `${file.fieldname}_${Date.now()}`, // Optional - file name in Cloudinary
  },
});

const upload = multer({ storage });

router.post('/upload', authMiddlewares.requireSignIn, authMiddlewares.isAdmin, upload.array('product', 4), imageController.uploadImage);

module.exports = router;
