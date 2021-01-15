const express = require("express")
const router = express.Router()
const routeAccess = require("../middlewares/authentication/routeAccess")
const {getActors,addActor,deleteActor} = require("../controllers/actors")

router.post("/add_actor",routeAccess,addActor)
router.get("/",routeAccess,getActors)
router.delete("/delete_actor/:id",routeAccess,deleteActor)


module.exports = router