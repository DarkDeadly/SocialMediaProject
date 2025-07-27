const express = require("express")
const registrationValidation = require("../middleware/UserValidation")
const { RegisterUser, LoginUser, GetUser } = require("../controller/userController")
const AuthValidation = require("../middleware/AuthMiddle")

const router = express.Router()


router.post("/register" , registrationValidation , RegisterUser )
router.post("/login" , LoginUser)
router.get("/getuser" , AuthValidation , GetUser)



module.exports = router