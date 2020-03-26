// third party module
const express = require('express')
const app = express()
require('dotenv').config()
const bodyParser = require('body-parser')

// middleware
app.use(bodyParser.urlencoded({ extended: false })) // for x-www-urlencoded
app.use(bodyParser.json()) // for json

// import router
const AuthRouter = require('./src/routes/Auth')
const AdminRouter = require('./src/routes/Admin')
const UserRouter = require('./src/routes/User')
const AgentRouter = require('./src/routes/Agent')

app.use('/auth', AuthRouter) // first register here
app.use('/admin', AdminRouter)
app.use('/user', UserRouter)
app.use('/agent', AgentRouter)
app.use('/file', express.static('files'))

// create migration table
/*
  migration rules :roles, user, user-details, agent, bus,route,
  schedules, transaction
*/
app.get('/migrate', function (req, res) {
  const { table } = req.body
  require(`./src/migrations/${table}`)
  const data = {
    success: true,
    msg: 'Data has been migrated'
  }
  res.send(data)
})
// port
const port = process.env.PORT

app.listen(port, function () {
  console.log(`listening on port ${port}`)
})
