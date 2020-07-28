var express = require('express');
var router = express.Router();
require('dotenv').config();
const db = require('../models');
const httpStatus = require('http-status');
//const _type = '_doc';
const async = require("async");
const returnPayLoad = {};
const logger = require('../config/logger.config');
const { body,validationResult } = require("express-validator");
// const fileUpload = require('express-fileupload');
var multer = require('multer');
const { sanitizeBody } = require("express-validator");
const apiResponse = require('../routes/helper/apiResponse');
const Frontend = require('../routes/models/Frontend');
const withName = Date.now();
const fs = require('fs-extra');

// var storage = multer.diskStorage({
//     // destination
//     destination: function (req, file, cb) {
//       //cb(null, './src/assets/uploads/')
//       cb(null, './public/uploads/')
//       //cb(null,'./');
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now()+'_'+file.originalname);
//     }
//   });
  
   
  
// var upload = multer({ 
//     storage:storage,
//     //limits:{fileSize:3000000}, // in byte
//     fileFilter:function(req, file, callback){
//         checkFileType(file,callback);
//     }
// });

// const upload = multer({dest:'./public/uploads/'}).single("demo_image");

// const mongoClient = require('../routes/helper/mongoClient');
// require("../routes/helper/mongoClient");

// exports.searchDoc = async function(indexName, mappingType, payload){
//     return await { user: 'userRecord', company: 'companyRecord' };
// };

// var storage = multer.diskStorage({
//     // destination
//     destination: function (req, file, cb) {
//       //cb(null, './src/assets/uploads/')
//       //cb(null, './public/uploads/')
//       cb(null,'./');
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now()+'_'+file.originalname);
//     }
// });

// var upload = multer({ 
//     storage:storage,
//     //limits:{fileSize:3000000}, // in byte
//     fileFilter:function(req, file, callback){
//         checkFileType(file,callback);
//     }
// });

// function checkFileType(file, cb){
//     // Allow ext
//     const filetype =/jpeg|jpg|png|gif|svg|bmp|tiff|pdf/;
//     const extname = filetype.test(path.extname(file.originalname).toLocaleLowerCase());
//     const mimetype = filetype.test(file.mimetype);
  
//     if(mimetype && extname){
//         return cb(null,true);
//     }else{
//         cb('Error:Images only!');
//     }
// }

// inside multer({}), file upto only 1MB can be uploaded
// const upload = multer({
//     storage: storage,
//     limits : {fileSize : 9000000},//9MB
//     fileFilter: imageFilter
// });
//var upload = multer({storage: storage});

// const upload = multer({dest:'/public/uploads'}).single("file");

//const upload = multer({dest:'uploads/'}).single("demo_image");

// router.post("/", (req, res) => { //working code
//     // console.log(req.file);
//     upload(req, res, (err) => {
//     if(err) {
//         // res.status(400).send("Something went wrong!");
//         return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: true, type: 'danger', result: "Please check you file extension" });
//     }else{
//         try {
//             var hostname = req.headers.host; // hostname = 'localhost:8080'
//             return res.status(httpStatus.OK).json({ error: false, type: 'success', result: "file uploaded successfully",path:req.protocol+'://'+hostname+"/uploads/"+withName+'_'+req.file.originalname });
//         } catch (error) {
//             return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: true, type: 'danger', result: err });
//         }
//     }
//    });
// });


const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

var storage = multer.diskStorage({   
    destination: function(req, file, cb) { 
       //cb(null, './public/uploads'); //tempDir   
       cb(null, './public/tempDir'); //tempDir
    }, 
    filename: function (req, file, cb) { 
        //cb(null , file.originalname+withName);   
        cb(null, withName+'_'+file.originalname);
    }
});

var upload = multer({ 
    storage: storage,
   fileFilter: imageFilter 
}).single("file");

exports.uploadFile = async function(req, res){  
    try {
        console.log(req.params);
        // console.log(req);
        // var dir = JSON.parse(req.body.data).directory;
        // console.log(dir);
        upload(req, res, (err) => {
            const fileName = withName+'_'+req.file.originalname;
            const dir = req.params.dir;

            if(err) {
                // res.status(400).send("Something went wrong!");
                return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: true, type: 'danger', result: "Please check you file extension" });
            }
            try {
                async function moveSingleFile(){
                    await fs.move('./public/tempDir/' + fileName, './public/uploads/' + dir + '/' + fileName, function (err) {
                        if (err) {
                            // return console.error(err);
                            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: true, type: 'danger', result: err });
                        }
                    });
                }
                moveSingleFile();
                var hostname = req.headers.host; // hostname = 'localhost:8080'
                return res.status(httpStatus.OK).json({ error: false, type: 'success', result: "file uploaded successfully",path:req.protocol+'://'+hostname+"/uploads/"+dir+'/'+withName+'_'+req.file.originalname });
            } catch (error) {
                return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: true, type: 'danger', result: error });
            }
        });   
    } catch (error) {
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: true, type: 'danger', result: error });
    }
};



