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
const { sanitizeBody } = require("express-validator");
const apiResponse = require('../routes/helper/apiResponse');
const Frontend = require('../routes/models/Frontend');
const Page = require('../routes/models/Page');
const Book = require('../routes/models/Book');
// const mongoClient = require('../routes/helper/mongoClient');
// require("../routes/helper/mongoClient");

// exports.searchDoc = async function(indexName, mappingType, payload){
//     return await { user: 'userRecord', company: 'companyRecord' };
// };

exports.create = [
    // body('id').not().isEmpty().withMessage('required field'),
    //body('sec_order').not().isEmpty().withMessage('required field'),
    body('section_props').not().isEmpty().withMessage('required field'),
    body('section_props_previous').not().isEmpty().withMessage('required field'),
    async (req, res) => {
        const errors = validationResult(req);
			if (!errors.isEmpty()) {
                //return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
                return await res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: true, type: 'danger', result: errors.array() });
			}else {
                try {   console.log(req.body);
                    const createPage = new Page({
                        section_id : req.body.section_id,
                        sec_order : req.body.sec_order,
                        section_type : req.body.section_type,
                        section_props: JSON.stringify(req.body.section_props),
                        section_props_previous: JSON.stringify(req.body.section_props_previous)
                    });

                    createPage.save((err,cuser)=>{
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

exports.bulkupdate = async function (req, res){
    try { 
        // console.log(req.rawBody);
        console.log(req.body.query);
        const query = JSON.parse(req.body.query);
        console.log(query);
        // console.log(query.length);
        for(let i=0;i<query.length;i++){
            // console.log(query[i]['is_active']);
            // console.log(query[i]['_id']);
            // console.log(query[i]['sec_order']);
            // console.log(query[i]['element_json']);
            // console.log(query[i]['element_json_previous']);
            Page.find({section_id : query[i]['section_id']}, function (err,data) {
                if(err){
                    console.log(err);
                }else{
                    Page.findOneAndUpdate({section_id : query[i]['section_id']},
                        {
                            $set:{
                                sec_order : query[i]['sec_order'],
                                section_type : query[i]['section_type'],
                                is_active : query[i]['is_active'],
                                scheduler_state : query[i]['scheduler_state'],
                                section_props : JSON.stringify(query[i]['section_props']),
                                section_props_previous : JSON.stringify(query[i]['section_props_previous'])
                            }
                        },
                        {   new:true },
                        function(err, updRecords){
                            if(err){
                                   console.log('Opps! There is an error in updation ! '+err);
                            }else{
                                console.log('updated '+updRecords);
                                //console.log('Update Information !'+updRecords);
                            }
                        }
                    );
                    console.log(data);
                }
            })
        }
        return res.status(httpStatus.OK).json({ error: false, type: 'success', result: 'successfully updated' });
    } catch (error) {
        return await {status: httpStatus.UNPROCESSABLE_ENTITY,  error: true, type: 'danger',result: error };
    }
}

exports.getAll = async function(req, res){  
    //console.log(payLoadQuery);
    try {
        // logger.info('Fetching all html codes');
        Page.find({}).exec(function(err,data){
            if(err){
                // console.log('Opps There is some error in getting contact requests !');
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

exports.getOne = async function (req, res, next){ console.log(req.params);
    try {
        Page.findById(req.params.id, function (err,data) {
            if(err){
                return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: true, type: 'danger', result: err });
            }else{
                if(data != null){
                    return res.status(httpStatus.OK).json({ error: false, type: 'success', result: data });
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
}

exports.updateOne = async function (req, res, next){ 
    try {   
        console.log(req.params);
        Page.find({section_id:req.params.section_id}, function (err,data) {
            if(err){
                return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: true, type: 'danger', result: err });
            }else{
                // console.log(data);
                if(data.length > 0){
                    console.log('got data');
                    Page.findOneAndUpdate({section_id:req.params.section_id},
                    {
                        $set:{
                            sec_order : req.body.sec_order,
                            section_type : req.body.section_type,
                            is_active : req.body.is_active,
                            scheduler_state : req.body.scheduler_state,
                            section_props: JSON.stringify(req.body.section_props),
                            section_props_previous: JSON.stringify(req.body.section_props_previous)
                        }
                    },
                    {   new:true },
                    function(err, updRecords){
                        if(err){
                                console.log('Opps! There is an error in updation ! '+err);
                                return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: true, type: 'danger', result: err });
                        }else{
                            //console.log('Update Information !'+updRecords);
                            return res.status(httpStatus.OK).json({ error: false, type: 'success', result: 'successfully updated' });
                        }
                    });
                }else{
                    return res.status(httpStatus.NOT_FOUND).json({ error: true, type: 'danger', result: 'no data found' });
                }
                // if(data != null){
                //     console.log(data);
                //     Page.findByIdAndUpdate(req.params.section_id,
                //         {
                //             $set:{
                //                 sec_order : req.body.sec_order,
                //                 is_active : req.body.is_active,
                //                 element_json: JSON.stringify(req.body.element_json),
                //                 element_json_previous: JSON.stringify(req.body.element_json_previous)
                //             }
                //         },
                //         {   new:true },
                //         function(err, updRecords){
                //             if(err){
                //                    console.log('Opps! There is an error in updation !');
                //                    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: true, type: 'danger', result: err });
                //             }else{
                //                 //console.log('Update Information !'+updRecords);
                //                 return res.status(httpStatus.OK).json({ error: false, type: 'success', result: 'successfully updated' });
                //             }
                //         }
                //     );
                // }else{
                //     return res.status(httpStatus.NOT_FOUND).json({ error: true, type: 'danger', result: 'no data found' });
                // }
            }
            // console.log("Successful deletion");
        });
    }catch (error) {
        // logger.error(error.message || 'Some error occurred while delete the html');
        return await {status: httpStatus.UNPROCESSABLE_ENTITY,  error: true, type: 'danger',result: error };
        console.log(error);
    }
}

exports.deleteOne = async function(req, res, next){  
    console.log(req.params);
    try {
        // logger.info('Deleting single html with ID ', businessunit_id);
        Page.findById( req.params.id , function (err,data) {
            if(err){
                return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: true, type: 'danger', result: err });
            }else{
                if(data != null){
                    Page.findByIdAndDelete(req.params.id, function (err) {
                        if(err){
                            console.log('delete page by id error '+err);
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


