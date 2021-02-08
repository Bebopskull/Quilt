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





  //takes in a patch_id and does a query for all the reviews for that patch, returns the array of reviews {comment,user_id,created_at, etc}

  return router;
};
