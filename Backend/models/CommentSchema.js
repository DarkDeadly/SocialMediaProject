const mongoose = require("mongoose")



const CommentsSchema = new mongoose.Schema({
    user : {type : mongoose.Schema.Types.ObjectId , ref : "User" , required : true},
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    description : {type : String , required : true ,maxlength: [300, "Comment must be less than 300 characters"]}
} , {timestamps : true})



module.exports = mongoose.model("Comments" , CommentsSchema)