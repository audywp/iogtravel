const Roles = require('express').Router()
const RolesController = require('../controllers/Roles')
// const AuthMiddleware = require('../middleware/Auth')
// const AuthController = require('../controllers/Auth')

Roles.post('/admin', RolesController.createAdmin)
// Roles.post('/update', RolesController.updateAdmin)

module.exports = Roles
