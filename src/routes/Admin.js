const Admin = require('express').Router()
// const multer = require('multer')
const UserControl = require('../controllers/User')
const AdminControl = require('../controllers/Admin')
const TokenMid = require('../middleware/Auth')
const AuthControl = require('../controllers/Auth')
const UserdControl = require('../controllers/UserDetail')
const AgenControl = require('../controllers/Agent')

Admin.post('/create', AdminControl.createAdmin)
Admin.post('/login', AuthControl.login)

// get
Admin.get('/users', TokenMid.checkToken, UserControl.read)
Admin.get('/agent', TokenMid.checkToken, AdminControl.readAgent)
Admin.get('/agent/userId', TokenMid.checkToken, AdminControl.getAgentByUser)
Admin.get('/bus', TokenMid.checkToken, AdminControl.readBus)
Admin.get('/user-detail', TokenMid.checkToken, AdminControl.readUserDetail)
Admin.get('/route', TokenMid.checkToken, AdminControl.readRoutes)
Admin.get('/schedule', TokenMid.checkToken, AdminControl.readSchedules)
Admin.get('/schedule-by-admin', TokenMid.checkToken, AdminControl.getScheduleAdminMade)
Admin.get('/transaction', TokenMid.checkToken, AdminControl.readTransaction)
Admin.get('/detail', TokenMid.checkToken, UserdControl.getUserDetailByIdUser)

// create
Admin.post('/agent/add/:idUser', TokenMid.checkToken, AdminControl.createAgent)
Admin.post('/bus/add/:idUser', TokenMid.checkToken, AdminControl.createBusAdmin)
Admin.post('/route/add/:idUser', TokenMid.checkToken, AdminControl.createRoutes)
Admin.post('/schedule/add/:idBus/:idRoute', TokenMid.checkToken, AdminControl.createSchedules)
// Admin.post('/schedule/add', )

// delete
Admin.delete('/route/delete/:idRoute', TokenMid.checkToken, AdminControl.deleteRoutes)
Admin.delete('/agent/delete/:idAgent', TokenMid.checkToken, AdminControl.deleteAgent)
Admin.delete('/bus/delete/:id', TokenMid.checkToken, AgenControl.deleteBuss)
Admin.delete('/schedule/delete/:idSchedule', TokenMid.checkToken, AdminControl.deleteSchedule)

// update
Admin.patch('/route/update/:idRoute', TokenMid.checkToken, AdminControl.updateRoutes)
Admin.patch('/agent/update', TokenMid.checkToken, AdminControl.updateAgent)
Admin.patch('/bus/update', TokenMid.checkToken, AgenControl.updateBusses)
Admin.patch('/schedule/update', TokenMid.checkToken, AdminControl.updateSchedule)
module.exports = Admin
