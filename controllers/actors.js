const errorHandler = require("../helpers/error/errorHandler")
const User = require("../models/User")
const Actor = require("../models/Actor")

const addActor = errorHandler(async (req,res,next)=>{
    const userId = req.user.id

    const user = await User.findById(userId)

    const {name,img,age,location} = req.body
    const actor = await Actor.create({
        name,img,age,location
    })

    await user.castList.push(actor)
    await user.save() 

    res.json({
        success:true,
        actor:actor
    })
}) 


const getActors = errorHandler(async (req,res,next)=>{
    const userId = req.user.id
    
    
    const user = await User.findById(userId).populate({path:"castList",select:"name age img location"})
    
    res.json({
        success:true,
        actors: user.castList
    })
}) 

const deleteActor = errorHandler(async (req,res,next)=>{
    const {id} = req.params
    await Actor.findByIdAndDelete(id)
    await User.singersList.remove(id)
    res.json({
        success:true,
        message:"Deleting successful"
    })
    

}) 


module.exports = {
    getActors,
    addActor,
    deleteActor
}