const uploadImage = (req, res) => {
  try {
    const imageArray = [];

    for (const file of req.files) {
      
      const imageUrl = {
        url: file.path,
      };
      imageArray.push(imageUrl);
    }

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
