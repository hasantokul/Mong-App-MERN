const User = require("../models/User")
const errorHandler = require("../helpers/error/errorHandler")



const getProfileInfo = errorHandler(async (req,res,next)=>{
    const userId = req.user.id
    const user = await User.findById(userId)
    

    res.json({
        success:true,
        user:user
    })
}) 

const editProfile = errorHandler(async (req,res,next)=>{
    const userId = req.user.id
    const edit = req.body
    
    
    const user = await User.findByIdAndUpdate(userId,{...edit},{new:true})

    
    await user.save()

    res.json({
        success:true,
        user:user
    })
}) 

const imageUpload = errorHandler(async (req,res,next)=>{


    const img = req.file
    const link = "http://localhost:5000/" + img.filename
    

    console.log(img)
    const user = await User.findByIdAndUpdate(req.user.id,{img:link},{
        new:true,
        runValidators:true
    })

    await user.save()
    res.json({
        success:true,
        user:user
    })
}) 


module.exports = {getProfileInfo,editProfile,imageUpload}