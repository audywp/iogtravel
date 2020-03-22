const Route = require('express').Router()

const RouteController = require('../controllers/Route')
const AuthMiddleware = require('../middleware/Auth')
const AuthController = require('../controllers/Auth')

Route.post('/login', AuthController.login)
Route.get('/', AuthMiddleware.checkAuthToken, RouteController.read)
Route.post('/', AuthMiddleware.checkAuthToken, RouteController.create)
Route.patch('/:id', AuthMiddleware.checkAuthToken, RouteController.update)
Route.delete('/:id', AuthMiddleware.checkAuthToken, RouteController.delete)

module.exports = Route
