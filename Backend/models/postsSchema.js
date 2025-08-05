const mongoose = require("mongoose")


const PostSchema = new mongoose.Schema({
   user : {type : mongoose.Schema.Types.ObjectId , ref : "User" , required : true} ,
   description : {type : String , required : true , trim : true , maxlength: 500},
   imageURL : {type : String },
   imageFileId: { type: String },
} , {timestamps : true})



module.exports = mongoose.model("Post" , PostSchema)