/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const database = require('./database') //database queries


module.exports = (db) => {

  const login =  function(email) {
    return database.getUserWithEmail(email)
    .then(user => user)
    .catch(err => console.log(err))
  }
  exports.login = login;

  router.post('/login', (req, res) => {
        const {email} = req.body;
    login(email)
      .then(user => {
        console.log(user.id)
        if (!user) {
          res.send({error: "error"});
          console.log('this error')
          return;
        }
        req.session.userId = user.id;
        return user.id;
      })
      .then (userId => {
        return database.getPatchesWithUser(userId)
      })
      .then (patches => res.json(patches))


  });

  return router;
};
