const path = require("path");
const multer = require("multer");
const MyError = require("../error/MyError")


const storage = multer.diskStorage({
    
    destination: function(req,file,cb) {
        
        const rootDir = path.dirname(require.main.filename);
        cb(null,path.join(rootDir,"/uploads"));

    },
    filename: function (req, file, cb) {
        console.log("File Object",file);
        let ext = '';
        if(file.originalname.split('.').length >1 ){
            ext = file.originalname.substring(file.originalname.lastIndexOf('.'));
        }
        console.log('ext', ext);
        cb(null, file.fieldname + '-' + Date.now() + ext)
    }
 });

 const fileFilter = (req,file,cb) => {
    allowedTypes = ["image/jpg","image/gif","image/jpeg","image/png"];

    if (!allowedTypes.includes(file.mimetype)){
        return cb(new MyError("Please provide a valid image file",400),false);
        
    }
    return cb(null,true);

}

const upload = multer({storage,fileFilter})

module.exports = {upload}