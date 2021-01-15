const express = require("express")
const router = express.Router()

const profile = require("./profile")
const authentication = require("./authentication")
const users = require("./users")



router.use("/profile",profile)
router.use("/authentication",authentication)
router.use("/users",users)







module.exports = router