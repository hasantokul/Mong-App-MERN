const errorHandler = require("../helpers/error/errorHandler")
const User = require("../models/User")

const getSearchedUser = errorHandler(async (req,res,next)=>{
    const {name} = req.params
    const users = await User.find({name:{
        $regex : new RegExp(name, "i") }})
    res.json({
        success:true,
        users:users
    })
    
    
}) 

module.exports = {
    
    getSearchedUser
    
}
