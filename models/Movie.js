const mongoose = require("mongoose");
const Schema = mongoose.Schema

const movieSchema = new Schema({
    name:{
        type:String,
        required:[true,"Please write a movie name"],
        
    },
    img:{
        type:String
        
    },
    cast:{
        type:String,
        required:[true,"Please write the cast of the movie"]
    },
    director:{
        type:String,
        required:[true,"Please write the director of movie"]
    },
    date: {
        type:String,
        required:[true,"Please write the date of the movie"]
    },
    imdb: {
        type:String,
        required:[true,"Please write the imdb point of the movie"]
    }
})

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
