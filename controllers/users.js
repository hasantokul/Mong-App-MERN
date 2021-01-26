const errorHandler = require("../helpers/error/errorHandler")
const User = require("../models/User")

const getSearchedUser = errorHandler(async (req,res,next)=>{

    const {name} = req.params

    const allUsers = await User.find({name:{
        $regex : new RegExp(name, "i") }}
    )

    const users = allUsers.filter(user => 
        user._id != req.user.id
        
    )

    
    
    
    
    
    res.json({
        success:true,
        users:users
    })
}) 

const getUserInfo = errorHandler(async (req,res,next)=>{
    const userId = req.params.userId
    
    const user = await User.findOne({_id:userId})
    console.log(user)

    res.json({
        success:true,
        user:user 
    })
})

const getUsersFavoriteSingers = errorHandler(async (req,res,next)=>{
    const userId = req.params.userId
    const user = await User.findOne({_id:userId}).populate({path:"singersList",select:"name age img location"})
    const singers = user.singersList

    res.json({
        success:true,
        singers:singers
    })
})

const getUsersFavoriteActors = errorHandler(async (req,res,next)=>{
    const userId = req.params.userId
    const user = await User.findOne({_id:userId}).populate({path:"castList",select:"name age img location"})
    const actors = user.castList

    res.json({
        success:true,
        actors:actors
    })
})

const getUsersSongs = errorHandler(async (req,res,next)=>{
    const userId = req.params.userId
    const user = await User.findOne({_id:userId}).populate({path:"songsList",select: "name album singer date img viewsOnYoutube"})
    const songs = user.songsList

    res.json({
        success:true,
        songs:songs
    })
})

const getUsersMovies = errorHandler(async (req,res,next)=>{
    const userId = req.params.userId
    const user = await User.findOne({_id:userId}).populate({path:"moviesList",select: "name cast director date img imdb"})
    const movies = user.moviesList

    res.json({
        success:true,
        movies:movies
    })
})



module.exports = {
    
    getSearchedUser,
    getUserInfo,
    getUsersFavoriteSingers,
    getUsersFavoriteActors,
    getUsersSongs,
    getUsersMovies
    
}
