var express = require('express');
var router = express.Router();
require('dotenv').config();
//const db = require('../models');
const httpStatus = require('http-status');
//const _type = '_doc';
const async = require("async");
const returnPayLoad = {};
const logger = require('../config/logger.config');
const { body,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require('../routes/helper/apiResponse');
const Frontend = require('../routes/models/Frontend');
// const mongoClient = require('../routes/helper/mongoClient');
// require("../routes/helper/mongoClient");

// exports.searchDoc = async function(indexName, mappingType, payload){
//     return await { user: 'userRecord', company: 'companyRecord' };
// };

const validate = validations => {
    return async (req, res, next) => {
      await Promise.all(validations.map(validation => validation.run(req)));
  
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
      //res.status(422).json({ errors: errors.array() });
      res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: true, type: 'danger', result: errors.array() });
    };
};

exports.htmlCreation = [
    body('title').not().isEmpty().withMessage('required field'),
    body('html').not().isEmpty().withMessage('required field'),
    async (req, res) => {
        const errors = validationResult(req);
			if (!errors.isEmpty()) {
                //return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
                return await res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: true, type: 'danger', result: errors.array() });
			}else {
                try {   console.log(req.body);
                    const createFrontend = new Frontend({
                        // title : req.body.title,
                        // description: req.body.description,
                        // html: JSON.string(req.body.html)
                        title : req.body.title,
                        description: req.body.description,
                        html: req.body.html
                    });
                    createFrontend.save((err,cuser)=>{
                        if(err){
                            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: true, type: 'danger', result: err });
                        }
                        return res.status(httpStatus.CREATED).json({ error: false, type: 'success', result: 'successfully saved' });
                    })
                }catch (err) {
                    return await res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: true, type: 'danger', result: err });
                }
                // return await res.status(200).json({ error: false, type: 'success', result: 'working' });
            }
    }
]



exports.getAll = async function(req, res){  
    //console.log(payLoadQuery);
    try {
        // logger.info('Fetching all html codes');
        Frontend.find({}).exec(function(err,data){
            if(err){
                console.log('Opps There is some error in getting contact requests !');
                return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: true, type: 'danger', result: err });
            }else{
                //res.json(contsList);
                return res.status(httpStatus.OK).json({ error: false, type: 'success', result: data });
            }
        });
    }catch (error) {
        // logger.error(error.message || 'Some error occurred while delete the Franchises');
        return await {status: httpStatus.UNPROCESSABLE_ENTITY,  error: true, type: 'danger',result: error };
        console.log(error);
    }
    
};


exports.deleteOne = async function(req, res, next){  
    console.log(req.params);
    try {
        // logger.info('Deleting single html with ID ', businessunit_id);
        Frontend.find({ title: req.params.title }, function (err,data) {
            if(err){
                return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: true, type: 'danger', result: err });
            }else{
                if(data.length > 0){
                    Frontend.deleteOne({ title: req.params.title }, function (err) {
                        if(err){
                            return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: true, type: 'danger', result: err });
                        }
                        return res.status(httpStatus.OK).json({ error: false, type: 'success', result: 'successfully deleted' });
                    });
                }else{
                    return res.status(httpStatus.NOT_FOUND).json({ error: true, type: 'danger', result: 'no data found' });
                }
            }
            // console.log("Successful deletion");
        });
    }catch (error) {
        // logger.error(error.message || 'Some error occurred while delete the html');
        return await {status: httpStatus.UNPROCESSABLE_ENTITY,  error: true, type: 'danger',result: error };
        console.log(error);
    }
};


