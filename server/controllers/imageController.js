const uploadImage = (req, res) => {
    try {
        const imageArray = req.files.map(file => file.path); // Cloudinary URLs are in `file.path`
        return res
            .status(200)
            .json({ message: "Images Uploaded", image_urls: imageArray });
    } catch (error) {
        console.log("Error from image controller");
        console.log(error);
        return res.status(500).json({ error: "Error uploading images" });
    }
}

module.exports = { uploadImage };
