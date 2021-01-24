const mongoose = require("mongoose");
const Schema = mongoose.Schema

const singerSchema = new Schema({
    name:{
        type:String,
        required:[true,"Please write the singer/group name"],
        
    },
    img:{
        type:String
        
    },
    age:{
        type:String,
        required:[true,"Please write the age of the singer/group"]
    },
    location:{
        type:String,
        required:[true,"Please write the hometown of the singer/group"]
    }
})

const Singer = mongoose.model('Singer', singerSchema);

module.exports = Singer;
