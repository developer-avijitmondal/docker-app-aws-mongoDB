var mongoose = require('mongoose'),
Schema = mongoose.Schema,
autoIncrement = require('mongoose-auto-increment');
require('dotenv').config();
var uri = process.env.MONGO_URL;
 
var connection = mongoose.createConnection(uri,{ useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex : true });
 
autoIncrement.initialize(connection);
 
var bookSchema = new Schema({
    title: String,
    genre: String,
    publishDate: Date
});
 
bookSchema.plugin(autoIncrement.plugin, 'Book');
var Book = connection.model('Book', bookSchema);
module.exports = Book;
