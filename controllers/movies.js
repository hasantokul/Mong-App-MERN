const errorHandler = require("../helpers/error/errorHandler")
const User = require("../models/User")
const MyError = require("../helpers/error/MyError")
const Movie = require("../models/Movie")

const getMovies = errorHandler(async (req,res,next)=>{
    const userId = req.user.id
    const user = await User.findById(userId).populate({path:"moviesList",select: "name cast director date img imdb"})
    const movies = user.moviesList
    res.json({
        success:true,
        movies:movies
    })
})

const addMovie = errorHandler(async (req,res,next)=>{
    const userId = req.user.id

    const user = await User.findById(userId)
    const {name,img,cast,director,date,imdb} = req.body
    const movie = await Movie.create({
        img,name,cast,director,date,imdb
    })
    await user.moviesList.push(movie)
    await user.save()


    res.json({
        success:true,
        movie:movie
    })
}) 

const deleteMovie = errorHandler(async (req,res,next)=>{
    const {id} = req.params
    
    await Movie.findByIdAndDelete(id)
    res.json({
        message:"Deleting successful"
    })
}) 

module.exports={
    addMovie,
    getMovies,
    deleteMovie
}