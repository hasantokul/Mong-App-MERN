const express = require("express")
const router = express.Router()
const routeAccess = require("../middlewares/authentication/routeAccess")
const {getSongs,addSong,deleteSong} = require("../controllers/songs")

router.get("/",routeAccess,getSongs)
router.post("/add_song",routeAccess,addSong)
router.delete("/delete_song/:id",routeAccess,deleteSong)






module.exports = router