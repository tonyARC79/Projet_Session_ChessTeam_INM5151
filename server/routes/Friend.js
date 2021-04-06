var express = require('express');
const models = require('./../models');
var cors = require('cors')
const jwt = require("jsonwebtoken");
const authorized = require("../utils/Authorization");
const { body, validationResult } = require('express-validator');

app = express()


app.get("/me/requests", authorized(), cors(), async (req, res) => {
  let userID = jwt.decode(req.get("Authorization").split(" ")[1]);
  userID = userID.id;
  try {
    let requests = await getRequests(userID);
    res.json(requests)

  }
  catch(err) {
    console.log(err)
    res.status(500).json({ error: "Server Error" })
  }
});


app.post("/friend/request", authorized(), cors(), [
  body('username').isString().trim().isAlphanumeric(),
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let username = req.body.username
  let userID = jwt.decode(req.get("Authorization").split(" ")[1]);
  userID = userID.id;

  let userRelating = await models.user.findOne({
    where: {
      username: username
    }
  })
    .then(user => {
      return user;
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: "Server Error" })
    });
  models.relationship.create({
    related_user_fk: userID,
    relating_user_fk: userRelating.user_id,
    type_fk: 3,
  }).then(result => {
    res.status(201).json("Request sent")
  })
});

app.post("/friend", authorized(), cors(), [
  body('username').isString().trim().isAlphanumeric(),
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let username = req.body.username
  let userID = jwt.decode(req.get("Authorization").split(" ")[1]);
  userID = userID.id;

  let userRelating = await models.user.findOne({
    where: {
      username: username
    }
  })
    .then(user => {
      return user;
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: "Server Error" })
    });


  models.relationship.findOne({
    where: {
      related_user_fk: userRelating.user_id,
      relating_user_fk: userID,
      type_fk: 3
    }
  }).then(result => {
    if (result) {
      result.update({
        type_fk: 1
      }).then(relationshipUpdate => {
        models.relationship.create({
          related_user_fk: userID,
          relating_user_fk: userRelating.user_id,
          type_fk: 1,
        }).then(friendship => {
          res.status(201).json("Friendship created")
        })
      })
    }
    else {
      res.status(403).json("No friend request found for that user")
    }
  })
});



async function getRequests(userID) {
  return await models.user.findOne({
    attributes: ['username'],
    include: [{
      model: models.user,
      as: 'Relating',
      attributes: ['username', 'user_id'],
      through: { attributes: [] },
      include: {
        model: models.relationship,
        as: 'relationship_related',
        attributes: ['type_fk'],
        where: {
          type_fk: 3
        }
      }
    }],
    where: {
      user_id: userID,
    },
  }).then(users => {
    return formatFriendRequestJson(users);
  })
  .catch(err => {
    throw new Error(err)
  });
}

function formatFriendRequestJson(users) {
  let requests = []
  for (const relatingFriends of users.Relating) {
    requests.push({
      "username": relatingFriends.username,
    })
  }
  return requests
}

module.exports = app;