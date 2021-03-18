var express = require('express');
const models = require('./../models');
var cors = require('cors')
const jwt = require("jsonwebtoken");
const authorized = require("../utils/Authorization");

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
  let username = decodeURI(req.query.username);
  if (username == "") {
    return res.json([])
  }

  models.user.findAll({
    attributes: ['username'],
    limit: 5,
    where: {
      username: {
        [models.Sequelize.Op.like]: '%' + username + '%'
      }
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

app.get("/profil", authorized(), cors(), async (req, res) => {
  let userID = jwt.decode(req.get("Authorization").split(" ")[1]);
  userID = userID.id;

  models.user.findOne({
    attributes: ['username', 'date_registered', 'age'],
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
  models.user.findOne({
    attributes: ['username'],
    where: {
      user_id: userID
    },
    include: [{
      model: models.user,
      as: 'Relating',
      attributes: ['username'],
      through: { attributes: [] },
    }],
  })
    .then(users => {
      res.json(users)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "Server Error" })
    });
});


module.exports = app;