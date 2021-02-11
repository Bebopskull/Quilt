const express = require('express');
const router  = express.Router();
const database = require('./database') //database queries

module.exports = (db) => {

	router.get("/:patchId", (req, res) => {
    const patchId = req.params.patchId;


    database.fetchComments(patchId)
      .then(comments => {
        res.json(comments);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post('/', (req, res) => {
    // extract information out of the comment form

    //where to get those, some of this info is in the patch object
    
    const userId = req.session.userId;
    const title = req.body.title;
    const url = req.body.url;
    const description = req.body.description;
    const categoryId = req.body.category_id;
    const mediaTypeId = req.body.media_type_id;

    console.log(`req.body`, req.body)
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

	return router;
};

