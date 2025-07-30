const express = require("express")
require("dotenv").config()
const cookieParser = require("cookie-parser")
const DbConnection = require("./config/db")
const userRouter = require('./routes/userRoute')
const cors = require("cors")
DbConnection()
const app = express()
const port = process.env.PORT



app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors({
  origin: process.env.FRONTEND_URL, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
}))
app.use("/auth" , userRouter)

app.listen(port , () => {
    console.log(`listening to port ${port}`)
})