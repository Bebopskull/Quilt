/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const database = require('./database') //database queries


module.exports = (db) => {

  const login = function (email) {
    return database.getUserWithEmail(email)
      .then(user => user)
      .catch(err => console.log(err))
  }
  exports.login = login;

  router.post('/login', (req, res) => {
    const { email } = req.body;
    login(email)
      .then(user => {

        if (!user) {
          console.log('user does not exist')
          res.send(null);
        } else {
        req.session.userId = user.id;

        res.json({id: user.id, name: user.name, email: user.email});
        }
      })
  });


  //returns user if logged in, returns null if no user is logged in.
  router.get('/login', (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      console.log('null');
      res.send(null)
    } else {
      database.getUserWithId(userId)
        .then((user) => {
          res.json(user)
        })
    }
  })

  router.post('/logout', (req, res) => {
    console.log("logging out")
    req.session = null;
    res.send(null)
  })

  //// UnhandledPromiseRejectionWarning error help!!
  // route is actually /api/users/register
  router.post("/register", (req, res) => {
    // front end to back end
    console.log(req.body);
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    // backend to database
    database.userRegistration([name, email, password])
      .then((user) => {
        //setting the cookie
        req.session.userId = user.id;

        //send back a response to front end
        // 201 : resource created
        res.status(201).json(
          {
            message: "User has been added to db!",
            user: user
          }
        )
      }).catch(err => {
        res.status(500)
          .json({ error: err.message });
      })

  })


  // endpoint; router is a middleware
  return router;
};

