const mongoose = require("mongoose")

const databaseConnection = () => {
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser : true,
        useFindAndModify : false,
        useCreateIndex : true,
        useUnifiedTopology : true
    }).then(()=> {
        console.log("MongoDb Connection Successful");
    }).catch(err => {
        console.log(err);
    });
}

module.exports = {
    databaseConnection
}