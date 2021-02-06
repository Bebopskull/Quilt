const pool = require("../db/pool.js");

  const getUserWithEmail = function (email) {
    return pool.query(`
    SELECT * FROM users
    WHERE email = $1`, [email])
    .then (res => res.rows[0])
    .catch (err => console.log(err))
  }

  exports.getUserWithEmail = getUserWithEmail;
