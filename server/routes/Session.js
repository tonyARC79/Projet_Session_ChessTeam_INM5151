var express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt')
const models = require('./../models');
const jwt = require('jsonwebtoken')
var cors = require('cors')
const config = require('../config')
app = express()

app.post('/join', cors(), [
  body('email').isEmail().normalizeEmail().withMessage("Email must be valid").trim().escape(),
  body('password').isLength({ min: 5 }).isString().withMessage("Length must be more than 5 characters"),
  body('username').isString().trim().isAlphanumeric(),
  body('birthdate').isDate(),
], async (req, res) => {
  let body = req.body
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let emailInUse = await models.user.findOne({
    where: {
      email: req.body.email
    }
  })
  if (emailInUse) {
    return res.status(409).json({ error: body.email + " is already used" })
  } else {
    bcrypt.hash(body.password, 10, async (err, hash) => {
      if (err) {
        res.status(500).send("Internal server error")
        console.log(err)
      } else {
        models.user.create({
          username: body.username,
          email: body.email,
          password: hash,
          birthdate: body.birthdate,
        }).then(result => {
          let token = jwt.sign(
            {
              "id": result.user_id,
              "email": result.email,
              "username": result.username,
              "birthdate": result.birthdate
            },
            config.secret,
            {
              "expiresIn": "6h"
            })
          res.status(201).json({ "token": token })
        })
      }
    });
  }
})

app.post("/session", [
  body('email').isEmail().normalizeEmail().withMessage("Email must be valid").trim().escape()
], (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  models.user.findOne({
    attributes: ['password', 'user_id', 'email', 'username', 'birthdate'],
    where: {
      email: req.body.email,
      date_deleted: null
    }
  })
    .then(user => {
      if (user) {
        bcrypt.compare(req.body.password, user.password).then(function (response) {
          if (response) {
            let token = jwt.sign({
              "id": user.user_id,
              "email": user.email,
              "username": user.username,
              "birthdate": user.birthdate
            }, config.secret, {
              "expiresIn": "6h"
            })
            res.status(200).send({ "token": token });
          } else {
            res.status(400).json({ error: 'Email/Password was invalid' })
          }
        });
      }
      else {
        res.status(400).json({ error: 'Email/Password was invalid' })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "Could not create session" })
    })
})

module.exports = app;