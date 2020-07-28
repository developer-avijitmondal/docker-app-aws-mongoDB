var mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');

var Schema = mongoose.Schema;

var FrontendSchema = new Schema({
	title: { type: String, required: true},
	description: { type: String},
	html: { type: String, required: true}
}, {timestamps: true});

module.exports = mongoose.model("Frontend", FrontendSchema);