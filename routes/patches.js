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
  })

  router.post("/collections", (req, res)=> {
    const user = req.body;
    database.getUserCollections(user)
    .then (collections => {
      console.log(collections);
      res.json(collections);
    })
    .catch(err => console.log(err));
  })

  router.get("/:search", (req,res) => {
    const searchStr = req.params.search;
    database.getSearchResults(searchStr)
    .then (patches => {
      res.json(patches)
    })
    .catch(err => console.log(err))
  })

  router.get("/collections/:id", (req, res) => {
    const collId = req.params.id;
    database.getPatchesByCollectionId(collId)
    .then (patches => {
      res.json(patches)
    })
    .catch(err => console.log(err))
  })

  router.post("/collections/new", (req,res) => {
    const { user_id,patch_id } = req.body;
    const name = "My Saved Patches";
    database.getCollectionIdByName(name,user_id)
    .then (id => {
      console.log("patch id is:",typeof patch_id,"id is:", typeof id.id)
      database.savePatch(parseInt(patch_id),parseInt(id.id))
      .then (output => res.json(output))
      .catch(err => console.log('at router',err))
    })
    .catch(err => console.log('err in router', err))
  });






  return router;

};
