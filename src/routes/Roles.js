const Roles = require('express').Router()
const RolesController = require('../controllers/Roles')
// const AuthMiddleware = require('../middleware/Auth')
// const AuthController = require('../controllers/Auth')

Roles.post('/admin', RolesController.createAdmin)

module.exports = Roles
