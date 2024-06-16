

const uploadImage = (req,res)=>{
    try {
        const imageArray = []
        for(let i=0;i<req.files.length;i++){
            const image_url = `${process.env.BACKEND_URL}/images/${req.files[i].filename}`;
            imageArray.push(image_url);
            
        }
        return res
          .status(200)
          .json({ message: "Image Uploaded", image_url: imageArray });
    } catch (error) {
        console.log("Error From image controller");
        console.log(error);
    }
}
module.exports={uploadImage}