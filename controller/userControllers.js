const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN

const userRegister = async(req, res)=>{
    try{
        const {username, email, password, confirmpassword} = req.body

        if(!username || !email || !password || !confirmpassword){
            return res.status(400).json({message: "All Fields are required"})
        }

        if(password !== confirmpassword){
            return res.status(400).json({message: "Password does not match"})
        }

        if(password.length < 8){
            return res.status(400).json({message: "Password must be at least 8 char"})
        }

        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(409).json({message: "User Already Exists"})
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const user = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await user.save()

        res.status(201).json({
            id: savedUser._id,
            username: savedUser.username,
            email:savedUser.email,
            createdAt: savedUser.createdAt
        })
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}

const userLogin = async(req, res)=>{
    try{
        const {email, password} = req.body

        if(!email || !password){
            return res.status(400).json({message: "All Feilds are required"})
        }
        const user = await User.findOne({email})

        if(!user){
            return res.status(409).json({message: "Invalid Credeantials"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(409).json({message: "Invalid credeantials"})
        }

        const payload = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = jwt.sign(payload, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN})

        res.status(201).json({
            message: "Login Successfull",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

module.exports = {userRegister, userLogin}