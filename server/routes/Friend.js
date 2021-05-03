var express = require('express');
const models = require('./../models');
var cors = require('cors')
const jwt = require("jsonwebtoken");
const authorized = require("../utils/Authorization");
const { body, validationResult } = require('express-validator');
const { Op } = require('sequelize')

app = express()


app.get("/me/requests", authorized(), cors(), async (req, res) => {
  let userID = jwt.decode(req.get("Authorization").split(" ")[1]);
  userID = userID.id;
  try {
    let requests = await getRequests(userID);
    res.json(requests)

  }
  catch (err) {
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


app.post('/friend/game', authorized(), cors(), [
  body('opponent').isString().trim().isAlphanumeric(),
], async (req, res) => {
  const errors = validationResult(req)
  console.log(req.body)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let opponent = req.body.opponent
  let userID = jwt.decode(req.get("Authorization").split(" ")[1]);

  models.game.create({
    player1: userID.username,
    player2: opponent,
    status: 'pending',
    fen: ''
  }).then(result => {
    res.status(201).json("Game Created")
  })
});

app.get("/me/game/requests", authorized(), cors(), async (req, res) => {
  let userID = jwt.decode(req.get("Authorization").split(" ")[1]);
  userID = userID.username;
  try {
    let GameRequests = await getGameRequests(userID);
    res.json(GameRequests)

  }
  catch (err) {
    console.log(err)
    res.status(500).json({ error: "Server Error" })
  }
});

app.patch('/me/game/accept', authorized(), [body('game_id')], async (req, res) => {

  //let token = jwt.decode(req.get("Authorization").split(" ")[1]);
  //let player2 = token.username
  let updatedGame = {}
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  updatedGame.status = 'Game in progress'
  gameID = req.body.game_id
  models.game.findOne({
    where: {
      game_id: gameID

    }
  }).then(game => {
    if (game) {
      game.update(updatedGame).then(result => {
        res.status(201).json({
          "message": 'Game in progress'
        })
      })
    }
  }).catch(err => {
    console.log(err)
    res.status(500).json({ error: "Server Error" })
  });

})

async function getGameRequests(userID) {
  return await models.game.findAll({
    where: {
      //player2: userID,
      //status: 'pending',
      [Op.or]: [{ player1: userID }, { player2: userID }],
    }
  }).then(games => {
    return games;
  })
    .catch(err => {
      throw new Error(err)
    });
}

app.get("/me/game/info", [body('game_id')], cors(), async (req, res) => {
  //let userID = jwt.decode(req.get("Authorization").split(" ")[1]);
  //userID = userID.username;
  game_id = body.game_id
  try {
    let GameInfos = await getGameInfoByID(game_id);
    res.json(GameInfos)

  }
  catch (err) {
    console.log(err)
    res.status(500).json({ error: "Server Error" })
  }
});

async function getGameInfoByID(game_id) {
  return await models.game.findAll({
    where: {
      game_id: game_id,
      status: 'Game in progress'
    }
  }).then(games => {
    return games;
  })
    .catch(err => {
      throw new Error(err)
    });
}


app.patch('/me/game/result', authorized(), [body('game_id'), body('winner'), body('moves') ], async (req, res) => {
  let updatedGame = {}
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  updatedGame.status = 'Completed'
  updatedGame.winner = req.body.winner
  updatedGame.fen = req.body.moves + ''
  gameID = req.body.game_id
  models.game.findOne({
    where: {
      game_id: gameID

    }
  }).then(game => {
    if (game) {
      game.update(updatedGame).then(result => {
        res.status(201).json({
          "message": 'Game is finished and ' + updatedGame.winner + ' is the winner!'
        })
      })
    }
  }).catch(err => {
    console.log(err)
    res.status(500).json({ error: "Server Error" })
  });

})

module.exports = app;