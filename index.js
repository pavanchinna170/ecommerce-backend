const express = require("express")
require("dotenv").config()
const connectDB = require("./config/db")
const userRouter = require("./routes/auth")
const ProtectedRoute = require("./routes/Protected")
const cors = require("cors")

const app = express();
app.use(cors())
app.use(express.json())

app.use('/api/auth', userRouter)
app.use('/api', ProtectedRoute)

connectDB();

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Server is Running at ${PORT}`)
})