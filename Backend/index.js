const express = require("express")
require("dotenv").config()
const cookieParser = require("cookie-parser")
const DbConnection = require("./config/db")
const userRouter = require('./routes/userRoute')

DbConnection()
const app = express()
const port = process.env.PORT



app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use("/auth" , userRouter)

app.listen(port , () => {
    console.log(`listening to port ${port}`)
})