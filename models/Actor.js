const mongoose = require("mongoose");
const Schema = mongoose.Schema

const actorSchema = new Schema({
    name:{
        type:String,
        required:[true,"Please write a actor/actress name"],
        unique:[true,"You have already added this actor/actress"]
    },
    img:{
        type:String
        
    },
    age:{
        type:String,
        required:[true,"Please write the age of the actor/actress"]
    },
    location:{
        type:String,
        required:[true,"Please write the hometown of actor/actress"]
    }
})

const Actor = mongoose.model('Actor', actorSchema);

module.exports = Actor;