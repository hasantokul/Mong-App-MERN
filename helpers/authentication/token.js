const jwt = require("jsonwebtoken")
const User = require("../../models/User")

const sendTokenToClient = (user,res) =>{

    const token = user.generateToken(user)


    res
    .status(201)
    .cookie("token", token, {
        expires : new Date(Date.now() * parseInt(process.env.COOKIE_EXPIRY) * 1000 * 60),
        httpOnly: true
        
        
    })
    .json({
        success : true,
        data : {
            name : user.name,
            email : user.email,
            
        },
        token : token
    })

    
}

module.exports = sendTokenToClient