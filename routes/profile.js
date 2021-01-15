const express = require("express")
const router = express.Router()
const actors = require("./actors")
const singers = require("./singers")
const songs = require("./songs")
const movies = require("./movies")
const {getProfileInfo,editProfile,imageUpload} = require("../controllers/profile")
const routeAccess = require("../middlewares/authentication/routeAccess")
var multer  = require('multer')
var {upload} = require("../helpers/library/multer")


router.get("/info",routeAccess,getProfileInfo)
router.put("/edit_profile",routeAccess,editProfile)
router.put("/image_upload",[routeAccess,upload.single("file")],imageUpload)

router.use("/songs",songs)
router.use("/movies",movies)
router.use("/singers",singers)
router.use("/actors",actors)





module.exports = router