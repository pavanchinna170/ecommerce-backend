const mongoose = require("mongoose")
require("dotenv").config()

const connectDB = async(req, res)=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB Atlas Connected")
    }
    catch(err){
        console.log("MongoDB Connection Was Not Success")
        process.exit(1)
    }
}

module.exports = connectDB;