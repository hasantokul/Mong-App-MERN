const errorHandler = require("../helpers/error/errorHandler")
const User = require("../models/User")
const MyError = require("../helpers/error/MyError")
const Song = require("../models/Song")

const getSongs = errorHandler(async (req,res,next)=>{
    const userId = req.user.id
    const user = await User.findById(userId).populate({path:"songsList",select: "name album singer date img viewsOnYoutube"})
    const songs = user.songsList
    res.json({
        success:true,
        songs:songs
    })
}) 

const addSong = errorHandler(async (req,res,next)=>{
    const userId = req.user.id

    const user = await User.findById(userId)
    const {name,img,album,singer,date,viewsOnYoutube} = req.body
    const song = await Song.create({
        img,name,album,singer,date,viewsOnYoutube
    })
    await user.songsList.push(song)
    await user.save() 


    res.json({
        success:true,
        song:song
    })
}) 

const deleteSong = errorHandler(async (req,res,next)=>{
    const {id} = req.params
    
    const userId = req.user.id
    await Song.findByIdAndDelete(id)
    res.json({
        message:"Deleting successful"
    })
}) 


module.exports = {
    getSongs,
    addSong,
    deleteSong
}