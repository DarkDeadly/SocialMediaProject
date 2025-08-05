const AsyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const PostModel = require("../models/postsSchema")
const imagekit = require("../config/imagekit");
const fs = require("fs").promises;



const CreatePost = AsyncHandler(async (req, res) => {
  const { description } = req.body;
  const userId = req.user.userId;
  try {
    const UserFound = await userModel.findById(userId);

    if (!UserFound) {
      return res.status(401).json({ success: false, message: "unauthorized" });
    }
       if (!description) {
       return res.status(400).json({message : "description is a requirement"})
    }
let optimisedImageUrl = "";

if (req.file) {
  const image = req.file;
  const fileBuffer = await fs.readFile(image.path);

  const response = await imagekit.upload({
    file: fileBuffer,
    fileName: image.originalname,
    folder: "/postImages",
  });

  await fs.unlink(image.path); // cleanup

  optimisedImageUrl = imagekit.url({
    path: response.filePath,
    transformation: [
      { width: "1250" },
      { quality: "auto" },
      { format: "webp" },
    ],
  });
}

 

    const post = await PostModel.create({
      description : description,
      imageURL : optimisedImageUrl || undefined,
      user : userId
    })
    if (post) {
      return res.status(201).json({success : true , message : "successfully created a post" , post })
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
});




module.exports = {CreatePost}
