const Users = require('express').Router()
const UserDetailController = require('../controllers/UserDetail')
const SchedulesController = require('../controllers/Schedules')
const AuthMiddleware = require('../middleware/Auth')

Users.get('/detail', AuthMiddleware.checkAuthToken, UserDetailController.read)

Users.post('/detail', AuthMiddleware.checkAuthToken, /* upload.single('picture'), */ UserDetailController.create)

Users.patch('/detail/:id', /* upload.single('picture'), */ UserDetailController.update)

Users.delete('/detail/:id', UserDetailController.delete)

Users.get('/schedules', SchedulesController.showSchedules)

module.exports = Users
