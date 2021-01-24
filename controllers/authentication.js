const errorHandler = require("../helpers/error/errorHandler")
const User = require("../models/User")
const sendTokenToClient = require("../helpers/authentication/token")
const bcrypt = require("bcryptjs")
const MyError = require("../helpers/error/MyError")
const nodemailer = require("nodemailer")
const crypto = require("crypto")



const register = errorHandler(async (req,res,next)=>{
    
    const {name,email,password,age,location,business} = req.body
    
    
    
    const user = await User.create({
        name,
        email,
        password,
        age,
        location,
        business
    })

    user.emailToken = crypto.randomBytes(16).toString("hex")
    user.save()

    if(!checkInputsExist2(name,email,password,age,location,business)){
        return next(new MyError("Please make sure that all inputs are filled",400))
    }

    sendVerificationRegister(email,user.emailToken)
    



    res.json({
        success:true,
        message:"we sended you a email,please check and verify your email."
    })
}) 




async function sendVerificationRegister(email,token){
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
        user: process.env.EMAIL, 
        pass: process.env.PASSWORD, 
        },
        tls: {
            rejectUnauthorized: false
        },
        
    });

    const mailOptions = {
        from: "tokulhasan24@gmail.com",
        to: email, 
        subject: "Verification", 
        text: "Please verify your email with copy the token and paste to the input and submit", 
        html: ` 
        <h3>Please copy this token and the paste to the input in the adress of the link down below : </h3>
        <h4>${token}</h4>
        <a href="http://localhost:3000/verify_registration"><h4>Go to adress</h4></a>`,
    }

   
    await transporter.sendMail(mailOptions,function(error, info){
        if (error) {
            
            return next(new MyError("Email could not be sent,please enter valid email",400))
            
        }
        console.log(info)
    }

    )
}


const verifyRegistration = errorHandler(async (req,res,next)=>{
    
   const emailToken = req.body.token
   const user = await User.findOne({emailToken:emailToken})

   if(!user){
    return next(new MyError("You entered the wrong token,please try again",400))
   }

   user.isVerified = true,
   user.emailToken = ""
   user.save()
   res.json({
       success:true,
       message:"Verification successful,thanks for verify your account. You can go and login now"
   })
}) 



const login = errorHandler(async (req,res,next)=>{

    
    const {email,password} = req.body
    const user = await User.findOne({email}).select("+password")

    if(!checkInputsExist(email,password)){
        return next(new MyError("Please make sure that all inputs are filled",400))
    }

    else if(!checkPasswordMatches(password,user.password)){
        return next(new MyError("Please make sure that you write the correct password",400))
    }

    
    if(!user){
        return next(new MyError("There is no such user with this informations please try again",400))
    }
    else if(!user.isVerified){
        return next(new MyError("You haven't verified your account yet,please verify your account",400))
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





const forgotPassword = errorHandler(async (req,res,next)=>{
    
    const emailObject = req.body
    const email = emailObject.email
    
    const user = await User.findOne({email:email})
    if(!user){
        return next(new MyError("There is no user with this email. Please make sure that you wrote the right email adress",400))
    }

    user.emailToken = crypto.randomBytes(16).toString("hex")
    user.isVerified = false
    await user.save()

    
    
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
        user: process.env.EMAIL, 
        pass: process.env.PASSWORD, 
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: "tokulhasan24@gmail.com",
        to: email, 
        subject: "Verification", 
        text: "Please verify your email with copy the token and paste to the input and submit", 
        html: ` 
        <h3>PLEASE COPY AND PASTE THIS TOKEN TO THE INPUT IN YOUR APP : </h3>
        <h5>${user.emailToken}</h5>`
    }

   
    await transporter.sendMail(mailOptions,function(error, info){
        if (error) {
            console.log(error)
            return next(new MyError("Email could not be sent,please enter valid email",400))
        }
        res.json({
            success:true,
            message:"email is sent"
        })
        
    });
}) 




const verifyEmail = errorHandler(async (req,res,next)=>{
    
    const emailToken = req.body
    const user = await User.findOne({emailToken:emailToken.token})
    
    if(!user){
        return next(new MyError("Your token is not matched with your account , please make sure that you entered the right token",400))
    }
    user.isVerified = true
    user.save()

    res.json({
        success:true,
        token:emailToken

    })
}) 



const changePassword = errorHandler(async (req,res,next)=>{
    
    const {email,password,confirmPassword} = req.body
    const user = await User.findOne({email:email})
    if(!user || !user.isVerified){
        return next(new MyError("This email has not been verified or doesn't exist in this application, please try again",400))
    }else if(password !== confirmPassword) {
        return next(new MyError("Passwords are not matched",400))
    }

    user.password = password
    
    user.emailToken = ""

    await user.save()

    res.json({
        success:true,
        message:"Password is changed"
    })

}) 


module.exports = {
    login,
    logout,
    register,
    forgotPassword,
    verifyEmail,
    changePassword,
    verifyRegistration
}
