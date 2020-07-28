const mongoose = require("mongoose");
require('dotenv').config();

var uri = process.env.MONGO_URL;

const mongoClient = mongoose.connect(uri,{ useUnifiedTopology: true, useNewUrlParser: true,useCreateIndex : true, useFindAndModify: false }).then(function(resolved){
  console.log("MongoDB database connection established successfully");
})




// autoIncrement.initialize(connection);

// mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

// const connection = mongoose.connection;

// connection.once("open", function() {
//   console.log("MongoDB database connection established successfully");
// });

// module.exports = connection;