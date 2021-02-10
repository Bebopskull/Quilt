/*
 * All routes for PATCHES are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const database = require('./database') //database queries

module.exports = (db) => {
  router.get("/", (req, res) => {
    database.getAllPatches()
      .then(patches => {
        console.log("here")
        res.json(patches);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/user", (req,res) => {
    const user = req.body;
    database.getPatchesWithUser(user)
    .then (patches => {
      res.json(patches)
    })
    .catch(err => console.log(err))
  });

  router.post('/', (req, res) => {
    // extract information out of the form
    const userId = req.session.userId;
    const title = req.body.title;
    const url = req.body.url;
    const description = req.body.description;
    const categoryId = req.body.category_id;
    const mediaTypeId = req.body.media_type_id;

    const newPatchArr = [userId, title, url, description, categoryId, mediaTypeId];
    // send that info to the db to be added (function call) - need to send userID from cookie
    database.addNewPatch(newPatchArr)
    .then(patch => {
      // receive information back from db
      // send info to front end
      res.status(201).json(patch)
    })
    // error handling
    .catch(err => console.log(err))
  })

  // ============================ POST ROUTE FOR USER REGISTRATION

  // const userRegistration = function(user) {
  //   return pool.query(
  //     `INSERT INTO users (name, email, password)
  //     VALUES ($1, $2, $3)
  //     `, [user])
  // }

  // create a POST route for catching the "add patch"
    // function that will do the SQL query
  // happy path:
    // send back a response to the client side "Pin added!"
    // send back information: all patches user has created
  // error:

  // if front end isn't ready yet:
    // use Postman or Insomnia to test the backend routes

// test feature: make the necessary changes. once test is successful, merge to master




  //takes in a patch_id and does a query for all the reviews for that patch, returns the array of reviews {comment,user_id,created_at, etc}

  return router;

};
