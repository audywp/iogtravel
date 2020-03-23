const Auth = require('express').Router()
const AuthController = require('../controllers/Auth')
const schedulesController = require('../controllers/Schedules')

Auth.post('/login', AuthController.login)
Auth.post('/register', AuthController.register)
Auth.get('/verify', AuthController.verify)
Auth.post('/forgot-password', AuthController.forgotPassword)
Auth.get('/schedules', schedulesController.showSchedules)

module.exports = Auth
