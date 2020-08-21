const { Pool, Client } = require('pg');
require('dotenv').config();

const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS
});
// client.connect();
client.connect(function(err) {
    if (err) throw err;
        console.log("Connected with Postgres Database!");
});

module.exports = client;
