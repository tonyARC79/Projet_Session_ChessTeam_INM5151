var express = require('express');
app = express()

app.post('/join', (req, res) => {
  res.status(200).json({
    message: 'Le compte utilisateur est créer'
  });
})

module.exports = app;