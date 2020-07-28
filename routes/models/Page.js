var mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');
require('dotenv').config();
var uri = process.env.MONGO_URL;
var Schema = mongoose.Schema;

var connection = mongoose.createConnection(uri,{ useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex : true, useFindAndModify: false });

autoIncrement.initialize(connection);

var PageSchema = new Schema({
    
    section_id : {
        type : String ,unique : true
    },
    sec_order: { 
        type : Number, unique : true, required : true
    },
    section_type : {
        type : String 
    },
    is_active : { 
        type : Number, default: 1 
    },
    scheduler_state : {
        type : Number, default: 1 
    },
    section_props : {
        type : String 
    },
    section_props_previous : {
        type : String 
    }
    // element_json : { 
    //     type : String 
    // },
    // element_json_previous : { 
    //     type : String 
    // }
}, {timestamps: true});

PageSchema.plugin(autoIncrement.plugin, 'Page');
var Page = connection.model('Page', PageSchema);
module.exports = Page;

//module.exports = mongoose.model("Page", PageSchema);
