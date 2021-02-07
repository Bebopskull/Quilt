//This file stores all the database pool.query functions

const pool = require("../db/pool.js");


const getAllPatches = function () {
  return pool.query(
    `SELECT * FROM patches
    ORDER BY created_at;`
  )
  .then (res => res.rows)
  .catch(err => console.log(err))
}

exports.getAllPatches = getAllPatches;

//Receives email string as a paramter and queries database to return the user obj associated with that email.
const getUserWithEmail = function (email) {
  return pool.query(`
  SELECT * FROM users
  WHERE email = $1`, [email])
  .then (res => {
    return res.rows[0];
  })
  .catch (err => console.log(err))
  }

exports.getUserWithEmail = getUserWithEmail;

//receives a user id integer and queries the database to return all patches created by the user.

const getPatchesWithUser = function (id) {
  return pool.query(
    `SELECT * FROM patches
    WHERE user_id = $1;`, [id]
  )
  .then (res => res.rows)
  .catch(err => console.log(err))
}

exports.getPatchesWithUser = getPatchesWithUser;


