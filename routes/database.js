//This file stores all the database pool.query functions

const pool = require("../db/pool.js");

//queries the database for all patches + their average rating.
const getAllPatches = function () {
  return pool.query(
    `SELECT patches.*, avg(rating) as ave_rating, users.name
    FROM patches
    JOIN users ON users.id = patches.user_id
    LEFT JOIN reviews ON patch_id = patches.id
    GROUP BY patches.id, users.id
    ORDER BY patches.created_at
    LIMIT 12;`
  )
  .then (res => {
    return res.rows
  })
  .catch(err => console.log(err))
}

exports.getAllPatches = getAllPatches;

const fetchComments = function (patch_id) {
  return pool.query(
    `SELECT * FROM reviews
    WHERE patch_id = ${patch_id}
    ORDER BY created_at;`
  )
  .then (res => {
    return res.rows
  })
  .catch(err => console.log(err))
}

exports.fetchComments = fetchComments;

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


//receives a user obj and queries the database to return all patches created by the user.
const getPatchesWithUser = function (user) {
  const id = user.id;
  return pool.query(
    `
    SELECT patches.*, avg(rating) as ave_rating, users.name
    FROM patches
    JOIN users ON users.id = patches.user_id
    LEFT JOIN reviews ON patch_id = patches.id
    WHERE users.id = $1
    GROUP BY patches.id, users.id
    ORDER BY patches.created_at
    LIMIT 12;
    `, [id]
  )
  .then (res => {
    return res.rows
  })
  .catch(err => console.log(err))
}

exports.getPatchesWithUser = getPatchesWithUser;


// adds newly registered user to database
// takes in an array of the user's name, email, password and inserts entry into to the db\

const userRegistration = function (userArr) {

  return pool.query(`
  SELECT * FROM users
  WHERE email = $1;`, [userArr[1]])
    .then(res => {
      if (res.rows[0]) {
        throw new Error('user exists');
      }
    })
    .then(() => {
      return pool.query(
        `INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *
    `, userArr)
      .then((result) => {
        console.log(result)
        return result.rows[0]
      })
    })
    .catch(err => console.log(err))
}

exports.userRegistration = userRegistration;

const getCategories = function() {
  return pool.query(
    `SELECT name
    FROM categories`
  )
}

exports.getCategories = getCategories;

const addNewPatch = function(newPatchArr) {
  // create a new patch in the db
  return pool.query(
    `INSERT INTO patches (user_id, title, url, description, category_id, media_type_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`,
    newPatchArr)
    .then((result) => result.rows[0])
}

exports.addNewPatch = addNewPatch;

//accepts a user object with "id" property and returns collections owned by that user
const getUserCollections = function(user) {
  return pool.query(`
  SELECT * from collections
  WHERE user_id = $1
  `,[user.id])
  .then (res => {
    return res.rows;
  })
}
exports.getUserCollections = getUserCollections;

//accepts a collection id and returns the patches in that collection
const getPatchesByCollectionId = function(id) {
  return pool.query(`
  SELECT patches.*, avg(rating) as ave_rating, users.name
    FROM patches
    JOIN users ON users.id = patches.user_id
    LEFT JOIN reviews ON reviews.patch_id = patches.id
    JOIN patches_collections ON patches_collections.patch_id = patches.id
    WHERE collection_id = $1
    GROUP BY collection_id,users.id,patches.id
    ORDER BY patches.created_at`,[id])
  .then(res => res.rows);
}
exports.getPatchesByCollectionId = getPatchesByCollectionId;

//takes in a user and adds in a collection "My Saved Patches" for that user
const addDefaultCollection = function(user) {
  const id = user.id;
  pool.query(
    `INSERT INTO collections (name, user_id)
    VALUES ('My Saved Patches', $1)
    `,[id])
}

exports.addDefaultCollection = addDefaultCollection;

//takes in a patch id, collection id, and saves the key-pair to patches_collections database table.
const savePatch = function(patchId,collectionId) {
  return pool.query(`
  INSERT INTO patches_collections (patch_id,collection_id)
  VALUES ($1, $2)
  RETURNING *;
  `,[patchId,collectionId])
}

exports.savePatch = savePatch;

//takes in a collection name (string) and a user Id, and returns the collection id of the collection with that name owned by the user.
const getCollectionIdByName = function (name,userId) {
  return pool.query(`
  SELECT id FROM collections
  WHERE name LIKE $1 AND user_id = $2
  LIMIT 1;
  `,[`%${name}%`,userId])
  .then(res => res.rows[0])
}
exports.getCollectionIdByName = getCollectionIdByName;

//takes in a string, and queries the database for patches that have the string in it's name or description
const getSearchResults = function (string) {

  console.log("in database:", string)
  return pool.query(`
  SELECT DISTINCT patches.*, avg(rating) as ave_rating, users.name
    FROM patches
    JOIN users ON users.id = patches.user_id
    LEFT JOIN reviews ON reviews.patch_id = patches.id
    JOIN patches_collections ON patches_collections.patch_id = patches.id
    WHERE LOWER(patches.title) LIKE LOWER($1) OR LOWER(patches.description) LIKE LOWER($1)
    GROUP BY collection_id,users.id,patches.id
    ORDER BY patches.created_at`,[`%${string}%`])
  .then(res => res.rows );
}

exports.getSearchResults = getSearchResults;


const getPatchesByCategory = function(category) {

  return pool.query(`
  SELECT DISTINCT patches.*, avg(rating) as ave_rating, users.name
    FROM patches
    JOIN users ON users.id = patches.user_id
    LEFT JOIN reviews ON reviews.patch_id = patches.id
    JOIN patches_collections ON patches_collections.patch_id = patches.id
    JOIN categories ON category_id = categories.id
    WHERE categories.name = $1
    GROUP BY collection_id,users.id,patches.id
    ORDER BY patches.created_at;
  `,[category])
  .then (res => res.rows)
  .catch(err => console.log('database err:',err))
}

exports.getPatchesByCategory = getPatchesByCategory;