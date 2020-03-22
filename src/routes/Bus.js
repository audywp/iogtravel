const Bus = require('express').Router()
const BusController = require('../controllers/Bus')
const AuthMiddleware = require('../middleware/Auth')
const AuthController = require('../controllers/Auth')

Bus.post('/login', AuthController.login)
Bus.get('/', BusController.read)
Bus.post('/', BusController.create)
Bus.patch('/:id', BusController.update)
Bus.delete('/:id', BusController.delete)

module.exports = Bus

// AuthMiddleware.checkAuthToken,
// AuthMiddleware.checkAuthToken,
// AuthMiddleware.checkAuthToken,