const mongoose = require("mongoose")

const UserShema  = new mongoose.Schema({
    username : {type : String ,unique : true},
    email : {type : String,required : true,unique : true},
    password : {type : String,required : true},
    PhoneNumber : {type : String,unique : true,sparse : true,trim : true},
    emailVerified : {type : Boolean,sparse : true , default : false} ,
    otpExpire:{type: Date}
})


module.exports = mongoose.model("User" , UserShema)