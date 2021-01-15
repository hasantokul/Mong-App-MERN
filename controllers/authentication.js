const errorHandler = require("../helpers/error/errorHandler")
const User = require("../models/User")
const sendTokenToClient = require("../helpers/authentication/token")
const bcrypt = require("bcryptjs")
const MyError = require("../helpers/error/MyError")


const register = errorHandler(async (req,res,next)=>{
    
    const {name,email,password,age,location,business} = req.body
    
    await User.create({
        name,
        email,
        password,
        age,
        location,
        business
    })

    if(!checkInputsExist2(name,email,password,age,location,business)){
        return next(new MyError("Please make sure that all inputs are filled",400))
    }
    res.json({
        success:true,
        message:"Registering successful"
    })
}) 


const login = errorHandler(async (req,res,next)=>{

    
    const {email,password} = req.body

    const user = await User.findOne({email}).select("+password")
    

    if(!checkInputsExist(email,password)){
        return next(new MyError("Please make sure that all inputs are filled",400))
    }

    if(!checkPasswordMatches(password,user.password)){
        return next(new MyError("Please make sure that you write the correct password",400))
    }
    sendTokenToClient(user,res) 
    
}) 


const logout = errorHandler(async (req,res,next)=>{
    
    res
    .status(200)
    .cookie("token",null,{
        expires : new Date(Date.now()),
        httpOnly:true
    })
    .json({
        success : true,
        message : "Logout Successful"
    })
}) 



const checkPasswordMatches = function(password,hashedPassword){
    const match = bcrypt.compareSync(password,hashedPassword);
    return match
}

const checkInputsExist = function(email,password){
    return email && password
}

const checkInputsExist2 = function(name,email,password,age,location,business){
    const data = {
        name,email,password,age,location,business
    }
    return data
}




module.exports = {
    login,
    logout,
    register
}