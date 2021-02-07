
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');

const { Pool } = require('pg');
const pool = new Pool({
  user: 'vagrant',
  host:'localhost',
  database: 'lightbnb',
  password:'123'
})

module.exports = pool;

pool.connect();


pool.query(`SELECT * from users;`)
.then(res => console.log(res))


app.listen(3000, () => {
  console.log(`Example app listening on port 3000`);
});
