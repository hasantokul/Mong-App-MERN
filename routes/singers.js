const express = require("express")
const router = express.Router()
const routeAccess = require("../middlewares/authentication/routeAccess")
const {addSinger,getSingers,deleteSinger} = require("../controllers/singers")

router.post("/add_singer",routeAccess,addSinger)
router.get("/",routeAccess,getSingers)
router.delete("/delete_singer/:id",routeAccess,deleteSinger)


module.exports = router