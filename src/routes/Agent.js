const Agent = require('express').Router()
const AuthController = require('../controllers/Auth')
const AuthToken = require('../middleware/Auth')
const UserdControl = require('../controllers/UserDetail')
const AgenControl = require('../controllers/Agent')

Agent.post('/login', AuthController.login)
Agent.get('/detail', AuthToken.checkToken, UserdControl.getUserDetailByIdUser)
Agent.patch('/update', AuthToken.checkToken, UserdControl.updateUserDetail)
Agent.post('/bus/add', AuthToken.checkToken, AgenControl.createBus)
Agent.get('/bus', AuthToken.checkToken, AgenControl.getBusses)
Agent.patch('/bus/update/:id', AuthToken.checkToken, AgenControl.updateBusses)
Agent.delete('/bus/delete/:idBuss', AuthToken.checkToken, AgenControl.deleteBuss)
Agent.get('/bus/:id')
module.exports = Agent
