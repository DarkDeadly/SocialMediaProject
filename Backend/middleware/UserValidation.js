const {body ,check} = require("express-validator")


const registrationValidation = [
    body('email').isEmail().withMessage("email Format is incorrect"),
    check('password').isLength({min : 8}).withMessage("The password must be at least 8 characters")
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/\d/).withMessage('Password must contain at least one number')
]



module.exports = registrationValidation