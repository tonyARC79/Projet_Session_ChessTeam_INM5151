'use strict';
const fs = require('fs')
const path = require('path')
const Sequelize = require("sequelize")
var basename = path.basename(__filename);
const config = require('../config')

const db = {}
//Store the database connection in our db object
const sequelize = new Sequelize(config.database.name, config.database.user, config.database.password, {
  host: config.database.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }, define: {
    timestamps: false
  }
})

fs
  .readdirSync(__dirname)
  .filter(file =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
  .forEach(file => {
    let filePath = path.join(__dirname, file)
    const model = require(filePath)(sequelize, Sequelize);
    db[model.name] = model;
  });



  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
