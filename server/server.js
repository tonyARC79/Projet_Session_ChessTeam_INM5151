const express = require('express');
const app = express();
const cors = require('cors')
const errorHandler = require('./utils/ErrorHandler')
const session = require('./routes/Session.js')
const userRoutes = require('./routes/User.js')
const friendRoutes = require('./routes/Friend.js')

const port = process.env.PORT || 5000;
app.use(cors())

app.use(express.json({limit: '1mb' }))
app.use(express.urlencoded({extended: true}));

app.use('/', session)
app.use('/api', userRoutes)
app.use('/api', friendRoutes)
app.use(errorHandler)



app.listen(port, () => {
  console.log(`App listening at ${port}`)
})
