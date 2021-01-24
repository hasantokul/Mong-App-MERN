const express = require("express")
const router = express.Router()
const {login,logout,register,forgotPassword,verifyEmail, changePassword,verifyRegistration} = require("../controllers/authentication")
const routeAccess = require("../middlewares/authentication/routeAccess")




router.post("/login",login)
router.post("/register",register)
router.get("/logout",routeAccess,logout)
router.post("/forgot_password",forgotPassword)
router.post("/verify_email",verifyEmail)
router.post("/verify_registration",verifyRegistration)
router.put("/change_password",changePassword)
 




module.exports = router
