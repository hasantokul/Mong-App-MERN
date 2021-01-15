const express = require("express")
const routes = require("./routes/main")
const dotenv = require("dotenv")
const {databaseConnection} = require("./helpers/database/databaseConnection")
const middleError = require("./middlewares/error/middleError")

const router = express.Router()

dotenv.config({ path: './values.env'})

databaseConnection()

const app = express()
const port = process.env.PORT || 5000

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization');
    

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(express.json())

app.use("/mong",routes)

app.use(middleError)

app.use(express.static('uploads'))

app.listen(port,()=>{
    console.log(`App has started on port ${port} successfully`)
})




module.exports = router