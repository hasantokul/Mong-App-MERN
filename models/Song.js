const mongoose = require("mongoose");
const Schema = mongoose.Schema

const songSchema = new Schema({
    name:{
        type:String,
        required:[true,"Please write a song name"],
        
    },
    img:{
        type:String
        
    },
    album:{
        type:String,
        required:[true,"Please write a song name"]
    },
    singer:{
        type:String,
        required:[true,"Please write a singer name"]
    },
    date: {
        type:String,
        required:[true,"Please write the date of the song"]
    },
    viewsOnYoutube: {
        type:String,
        required:[true,"Please write the views of the song in Youtube"]
    }
})

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
