const express = require("express")
const router = express.Router()
const verifyToken = require("../middileware/authMiddileware")

router.get('/profile', verifyToken, (req, res)=>{
    res.status(201).json({
        message: "Protected Route Accesed",
        user: req.user
    })
})

module.exports = router;