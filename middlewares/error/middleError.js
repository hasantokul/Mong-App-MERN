const MyError = require("../../helpers/error/MyError")

const middleError = (err,req,res,next) => {
    
    let error = new MyError(err.message,err.status);
    
    console.log(err);

    
    
    return res.status(error.status).json({
        success : false,
        message : error.message 
    });
    
}

module.exports = middleError;
