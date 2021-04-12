var express = require('express');
const models = require('./../models');
var cors = require('cors')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
const { body, validationResult } = require('express-validator');
const authorized = require("../utils/Authorization");
const config = require('../config')

app = express()

app.get("/user/valid", cors(), async (req, res) => {
  let username = decodeURI(req.query.username);

  models.user.findOne({
    where: {
      $and: models.Sequelize.where(models.Sequelize.fn('lower', models.Sequelize.col('username')), models.Sequelize.fn('lower', username))
    }
  })
    .then(users => {
      if (users) {
        res.status(200).json({ valid: false, message: "Le nom d'utilisateur est déjà pris." })
      }
      else {
        res.json({ valid: true })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ valid: false, message: "Server Error" })
    });
});

app.get("/users", authorized(), cors(), async (req, res) => {
  let token = jwt.decode(req.get("Authorization").split(" ")[1]);
  let userID = token.id;
  let username = decodeURI(req.query.username);
  if (username == "") {
    return res.json([])
  }
  let users = await models.user.findAll({
    attributes: ['username', 'date_registered'],
    limit: 5,
    where: {
      username: {
        [models.Sequelize.Op.like]: '%' + username + '%'
      }
    }
  })
    .then(users => {
      return users;
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "Server Error" })
    });


  let friends = await getFriends(userID);
  let filteredUsers = filterUserByFriends(users, friends);
  res.json(filteredUsers)
});

app.get("/user", authorized(), cors(), async (req, res) => {
  let username = decodeURI(req.query.username);

  models.user.findOne({
    attributes: ['username', 'date_registered'],
    where: {
      $and: models.Sequelize.where(models.Sequelize.fn('lower', models.Sequelize.col('username')), models.Sequelize.fn('lower', username))
    }
  })
    .then(users => {
      res.json(users)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "Server Error" })
    });
});


app.patch("/user", authorized(), cors(), [
  body('email').optional().isEmail().normalizeEmail().withMessage("Email must be valid").trim().escape(),
  body('password').optional().isLength({ min: 5 }).isString().withMessage("Length must be more than 5 characters"),
  body('birthdate').optional().isDate(),
], async (req, res) => {
  let token = jwt.decode(req.get("Authorization").split(" ")[1]);
  let userID = token.id;
  let body = req.body
  let updateUser = {}
  updateUser.user_id = userID;
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  if (body.email) {
    let emailInUse = await models.user.findOne({
      attributes: ['email'],
      where: {
        email: body.email
      }
    }).then(user => {
      return user;
    })
    if (emailInUse) {
      return res.status(409).json({ "valid": false, "message": "Email already in use" })
    }
    updateUser.email = body.email;
  }
  if (body.birthdate) {
    updateUser.birthdate = body.birthdate;
  }
  if (body.password) {
    let password = null;
    password = await bcrypt.hash(body.password, 10)
    if (!password) {
      return res.status(500).json({ "valid": false, "message": "Server error" })
    }
    updateUser.password = password
  }
  models.user.findOne({
    attributes: ['username', 'date_registered', 'email'],
    where: {
      user_id: userID
    }
  })
    .then(user => {
      if (user) {
        user.update(updateUser).then(result => {
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
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "Server Error" })
    });
});

app.get("/profil", authorized(), cors(), async (req, res) => {
  let userID = jwt.decode(req.get("Authorization").split(" ")[1]);
  userID = userID.id;

  models.user.findOne({
    attributes: ['username', 'date_registered', 'birthdate'],
    where: {
      user_id: userID
    }
  })
    .then(users => {
      res.json(users)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "Server Error" })
    });
});


app.get("/me/friends", authorized(), cors(), async (req, res) => {
  let userID = jwt.decode(req.get("Authorization").split(" ")[1]);
  userID = userID.id;
  try {
    let friends = await getFriends(userID);
    res.json(friends)

  }
  catch (err) {
    console.log(err)
    res.status(500).json({ error: "Server Error" })
  }
});

function filterUserByFriends(users, friends) {
  let filteredUsers = []
  let allFriends = []
  for (const friend of friends) {
    allFriends.push(friend.username);
  }
  for (const user of users) {
    let username = user.username;
    if (!allFriends.includes(username)) {
      filteredUsers.push(user);
    }
  }
  return filteredUsers;
}

async function getFriends(userID) {
  return await models.user.findOne({
    attributes: ['username'],
    include: [{
      model: models.user,
      as: 'Relating',
      attributes: ['username', 'user_id', 'date_registed'],
      through: { attributes: [] },
      include: {
        model: models.relationship,
        as: 'relationship_related',
        attributes: ['type_fk'],
        where: {
          type_fk: 1
        }
      }
    }],
    where: {
      user_id: userID,
    },
  }).then(users => {
    return formatFriendJSON(users);
  })
    .catch(err => {
      throw new Error(err)
    });
}


function formatFriendJSON(user) {
  let friends = []
  for (const relatingFriends of user.Relating) {
    friends.push({
      "username": relatingFriends.username,
      "RegisterDate": relatingFriends.date_registed,
    })
  }
  return friends
}


module.exports = app;