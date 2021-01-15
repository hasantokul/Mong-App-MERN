const errorHandler = require("../helpers/error/errorHandler")
const User = require("../models/User")
const Singer = require("../models/Singer")

const addSinger = errorHandler(async (req,res,next)=>{
    const userId = req.user.id

    const user = await User.findById(userId)

    const {name,img,age,location} = req.body
    const singer = await Singer.create({
        name,img,age,location
    })

    await user.singersList.push(singer)
    await user.save()

    res.json({
        success:true,
        singer:singer
    })
}) 


const getSingers = errorHandler(async (req,res,next)=>{
    const userId = req.user.id
    
    
    const user = await User.findById(userId).populate({path:"singersList",select:"name age img location"})
    
    res.json({
        success:true,
        singers: user.singersList
    })
}) 

const deleteSinger = errorHandler(async (req,res,next)=>{
    const {id} = req.params
    await Singer.findByIdAndDelete(id)
    await User.singersList.remove(id)
    res.json({
        success:true,
        message:"Deleting successful"
    })
    

}) 


module.exports = {
    getSingers,
    addSinger,
    deleteSinger
}

