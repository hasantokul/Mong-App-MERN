const express = require("express")
const router = express.Router()
const routeAccess = require("../middlewares/authentication/routeAccess")
const {getSearchedUser} = require("../controllers/users")


router.get("/search/:name",routeAccess,getSearchedUser)








module.exports = router