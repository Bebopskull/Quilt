/*
 * All routes for Widgets are defined here
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
        res.json(patches);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  //GET OWNER OF PATCH
  router.get("/user", (req, res) => {
    // database.getAllPatches()
    //   .then(patches => {
    //     res.json({ patches });
    //   })
    //   .catch(err => {
    //     res
    //       .status(500)
    //       .json({ error: err.message });
    //   });
  });

  //

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
