const Schedules = require('express').Router()
const SchedulesController = require('../controllers/Schedules')
const AuthMiddleware = require('../middleware/Auth')
const AuthController = require('../controllers/Auth')

Schedules.post('/login', AuthController.login)
Schedules.get('/', SchedulesController.showSchedules)
Schedules.post('/', AuthMiddleware.checkAuthToken, SchedulesController.create)
Schedules.patch('/:id', AuthMiddleware.checkAuthToken, SchedulesController.update)
Schedules.delete('/:id', AuthMiddleware.checkAuthToken, SchedulesController.delete)

module.exports = Schedules
