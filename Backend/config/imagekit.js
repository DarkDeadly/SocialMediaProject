const Imagekit = require("imagekit")

let imagekit = new Imagekit({
    publicKey:process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint:process.env.IMAGE_KIT_URL_ENDPOINT
})




module.exports = imagekit;