const express = require("express")
const router = express.Router()
const routeAccess = require("../middlewares/authentication/routeAccess")
const {addMovie,getMovies,deleteMovie} = require("../controllers/movies")

router.post("/add_movie",routeAccess,addMovie)
router.get("/",routeAccess,getMovies)
router.delete("/delete_movie/:id",routeAccess,deleteMovie)



module.exports = router