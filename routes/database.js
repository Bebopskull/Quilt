//This file stores all the database pool.query functions

const pool = require("../db/pool.js");

//queries the database for all patches + their average rating.
const getAllPatches = function () {
  return pool.query(
    `SELECT patches.*, avg(rating) as ave_rating
    FROM patches
    LEFT JOIN reviews ON patch_id = patches.id
    GROUP BY patches.id
    ORDER BY patches.created_at
    LIMIT 12;`
  )
  .then (res => {

    return res.rows
  })
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

//Receives INTEGER as a parameter and queries database to return the user obj associated with that id.
const getUserWithId = function (id) {
  return pool.query(`
  SELECT * FROM users
  WHERE id = $1`, [id])
  .then (res => {
    return res.rows[0];
  })
  .catch (err => console.log(err))
  }

exports.getUserWithId = getUserWithId;


//receives a user id integer and queries the database to return all patches created by the user.
const getPatchesWithUser = function (id) {
  return pool.query(
    `
    SELECT patches.*, avg(rating) as ave_rating
    FROM patches
    LEFT JOIN reviews ON patch_id = patches.id
    WHERE patches.user_id = $1
    GROUP BY patches.id
    ORDER BY patches.created_at;`, [id]
  )
  .then (res => {
    return res.rows
  })
  .catch(err => console.log(err))
}

exports.getPatchesWithUser = getPatchesWithUser;

//still WIP
const getPatchCreator = function (patch_id) {
  return pool.query(
    `SELECT * FROM USERS
    JOIN patches ON users.id = user_id
    WHERE patches.id = $1
    `,[patch_id])

}

// adds newly registered user to database
// takes in an array of the user's name, email, password and inserts entry into to the db
const userRegistration = function(user) {
  return pool.query(
    `INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    `, [user])
}

exports.userRegistration = userRegistration;
