const express = require("express")
const AuthValidation = require("../middleware/AuthMiddle")
const { CreatePost, GetPosts, DeletePost } = require("../controller/postController")


const router = express.Router()


router.post("/add" , AuthValidation , CreatePost)
router.get("/getPosts" , AuthValidation , GetPosts )
router.delete("/delete/:id" ,AuthValidation , DeletePost )




module.exports = router