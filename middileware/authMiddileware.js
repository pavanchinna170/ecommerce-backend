const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = async(req, res, next)=>{
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(409).json({message: "No Token Provied"})
    }

    const token = authHeader.split(" ")[1]

    try{
        const decoded = jwt.verify(token, JWT_SECRET)
        req.user = decoded,
        next()
    }
    catch(err){
        res.status(409).json({message: "Invalid or Token Expires"})
    }
}

module.exports = verifyToken;