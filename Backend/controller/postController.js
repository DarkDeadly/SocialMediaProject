const AsyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const PostModel = require("../models/postsSchema");
const imagekit = require("../config/imagekit");
const fs = require("fs").promises;

const CreatePost = AsyncHandler(async (req, res) => {
  const { description } = req.body;
  const userId = req.user.id;
  try {
    const UserFound = await userModel.findById(userId);

    if (!UserFound) {
      return res.status(401).json({ success: false, message: "unauthorized" });
    }
    if (!description) {
      return res.status(400).json({ message: "description is a requirement" });
    }
    let optimisedImageUrl = "";
    let FileID = ""
    if (req.file) {
      const image = req.file;
      const fileBuffer = await fs.readFile(image.path);

      const response = await imagekit.upload({
        file: fileBuffer,
        fileName: image.originalname,
        folder: "/postImages",
      });
      FileID = response.fileId
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
      description: description,
      imageURL: optimisedImageUrl || undefined,
      user: userId,
      imageFileId : FileID || undefined
    });
    if (post) {
      return res
        .status(201)
        .json({ success: true, message: "successfully created a post", post });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
});


const GetPosts = AsyncHandler(async(req , res) => {
  const posts = await PostModel.find()
  if (!posts) {
    return res.status(400).json({success : false , message : "There is no post"})
  }
  return res.status(201).json({success : true , posts})
})

const DeletePost = AsyncHandler(async (req, res) => {
  const userId = req.user.id; 
  const { postId } = req.params;

  try {
    const post = await PostModel.findById(postId);
    if (post.length === 0) {
      return res.status(404).json({ message: "Post not found", success: false });
    }

    if (!post.user.equals(userId)) {
      return res.status(403).json({ message: "You are not authorized to delete this post", success: false });
    }
    if (post.imageFileId) {
      await imagekit.deleteFile(post.imageFileId)
    }
    await PostModel.findByIdAndDelete(postId);
    return res.status(200).json({ message: "Post deleted successfully", success: true });

  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
});
module.exports = { CreatePost , GetPosts , DeletePost };
