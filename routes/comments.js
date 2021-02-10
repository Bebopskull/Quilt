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

	return router;
};

