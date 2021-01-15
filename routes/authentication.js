const express = require("express")
const router = express.Router()
const {login,logout,register} = require("../controllers/authentication")
const routeAccess = require("../middlewares/authentication/routeAccess")



router.post("/login",login)
router.post("/register",register)
router.get("/logout",routeAccess,logout)
 




module.exports = router