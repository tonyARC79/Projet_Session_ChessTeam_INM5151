const express = require('express');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000;
const session = require('./routes/Session.js')

app.use(cors())

app.use(express.json({limit: '1mb' }))
app.use(express.urlencoded({extended: true}));

app.use('/', session)



app.listen(port, () => {
  console.log(`App listening at ${port}`)
})
