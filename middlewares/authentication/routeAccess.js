const MyError = require("../../helpers/error/MyError");
const jwt = require("jsonwebtoken");
const { decode } = require("json-web-token");



const routeAccess = function(req,res,next){
    const token = req.headers.authorization;
    
    if(!token){
        return next(new MyError("You are not allowed to access",400))
    }
    jwt.verify(token,"dynamite", function(err,decoded){
        if(err){
            return next(new MyError("You are not allowed to access",400))
        }
        req.user = {
            id: decoded.id,
            name : decoded.name
        }
        
        next()
    })
   
    
}


module.exports = routeAccess