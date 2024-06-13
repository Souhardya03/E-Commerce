const uploadImage = (req, res) => {
    try {
      const imageArray = [];
      for (let i = 0; i < req.files.length; i++) {
        // Assuming the server is running locally on port 8000 and serves static files from /images
        const image_url = `http://localhost:8000/images/${req.files[i].filename}`;
        imageArray.push(image_url);
      }
      return res.status(200).json({ message: "Image Uploaded", image_url: imageArray });
    } catch (error) {
      console.error("Error From image controller:", error);
      return res.status(500).json({ message: "Image upload failed", error: error.message });
    }
  };
  
  module.exports = { uploadImage };