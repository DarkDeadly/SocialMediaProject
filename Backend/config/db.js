const mongoose  = require("mongoose")


const DbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connecting to database successfully")
        
    } catch (error) {
      console.log(error.message)
    }
}



module.exports = DbConnection