const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/migrate', function (req, res) {
  require('./src/migrations/Users')
  const data = {
    success: true,
    msg: 'Data has been migrated'
  }
  res.send(data)
})

app.use('/users/picture', express.static('files'))

// Import Router
const UserRoutes = require('./src/routes/Users')
const AuthRoutes = require('./src/routes/Auth')
const RolesRouters = require('./src/routes/Roles')
const BusessRouters = require('./src/routes/Bus')
const UserDetailRouters = require('./src/routes/User_detail')
const RouteRouters = require('./src/routes/Route')
const SchedulesRouters = require('./src/routes/Schedules')
const TransactionRouters = require('./src/routes/Transaction')
const AgenRouters = require('./src/routes/Agen')
const reservationRouters = require('./src/routes/Reservation')
const SchedulesController = require('./src/controllers/Schedules')
const token = require('./src/middleware/Auth')
// Define Routes
app.get('/', SchedulesController.read)
app.use('/users', UserRoutes)
app.use('/auth', AuthRoutes)
app.use('/roles', RolesRouters)
app.use('/bus', BusessRouters)
app.use('/user', UserDetailRouters)
app.use('/route', RouteRouters)
app.use('/schedules', SchedulesRouters)
app.use('/transaction', TransactionRouters)
app.use('/agen', token.checkAuthToken, AgenRouters)
app.use('/reservation', reservationRouters)

app.listen(process.env.APP_PORT, function () {
  console.log(`Port ${process.env.APP_PORT}`)
})

// const time = result.date_time
// const timeNow = JSON.stringify(time)
// const timeString = timeNow.slice(3, 10)
// return JSON.parse(timeString)
