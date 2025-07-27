const JWT = require("jsonwebtoken")
const AsyncHandler = require("express-async-handler")


const AuthValidation =  AsyncHandler(async(req , res , next) => {
    const authHeader = req.headers.authorization;
    // reading the token either from headedrs authorization or the cookie
    let token = authHeader &&authHeader.split(" ")[1] || req.cookies.token
    if (!token) {
        return res.status(401).json({success : false , message: "Token missing or malformed"})
    }
    const decoded = JWT.verify(token , process.env.JWT_SECRET)
    req.user = decoded
    next()

})



module.exports = AuthValidation