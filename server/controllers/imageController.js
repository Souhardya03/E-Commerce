const uploadImage = (req, res) => {
    try {
      const imageArray = req.files.map(file => {
        // Access the Cloudinary URL via `file.path`
        return {
          url: file.path,
        };
      });
  
      return res.status(200).json({
        message: "Images Uploaded",
        image_url: imageArray
      });
    } catch (error) {
      console.error("Error from image controller:", error);
      return res.status(500).json({ error: "Error uploading images" });
    }
  };
  
  module.exports = { uploadImage };
  