const { Pool } = require("pg");
require('dotenv').config(); 

module.exports = new Pool({
  host: process.env.DB_HOST, // or wherever the db is hosted
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
});
