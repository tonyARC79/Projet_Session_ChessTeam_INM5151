const jwt = require('express-jwt')
const {secret} = require('../config')

function authorized(roles = null) {
  return [jwt({secret, algorithms: ['HS256']}) ,(req, res, next) => {
    next()
  }]
}

module.exports = authorized;
