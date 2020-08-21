var express = require('express');
var router = express.Router();
var multer = require('multer');
const httpStatus = require('http-status');
const withName = Date.now();
const fileUploadService = require('../services/fileUploadService');

router.post('/:dir',fileUploadService.uploadFile);

// router.post('/', upload.single('file'), (req, res, next) => {
//     // console.log(req);
//     // console.log('files', req.file);
//     // res.send(req.files);
//     console.log(req.file);
//     console.log(req.files);
//     console.log(req.body);
//     try{
//         const file = req.file;
//         if (!file) {
//             res.status(400).json({
//                 "status": "failed",
//                 "code" : "400",
//                 "message" : "Please upload file"
//             });
//         }

//         res.status(200).json({
//             "status": "success",
//             "code" : "200",
//             "message" : "file uploaded successfully"
//         });
//     }catch(err){
//         console.log(err.message);
//         res.status(200).json({
//             "status": "failed",
//             "code" : "500",
//             "message" : err.message
//         });
//     }
// });


// router.post("/", (req, res) => {
//     upload(req, res, (err) => {
//      if(err) {
//        res.status(400).send("Something went wrong!");
//      }
//      res.send(req.file);
//    });
// });

// router.post("/", upload.array("uploads[]", 20), function (req, res, next) {
//     console.log('files', req.files);
//     // res.send(req.files);
//     const files = req.files
//     // if (!files) {
//     //     const error = new Error('Please choose files')
//     //     error.httpStatusCode = 400
//     //     return next(error)
//     // }
//     res.send(files)
// });

module.exports = router;
