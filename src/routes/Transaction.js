const Transaction = require('express').Router()
const transactionController = require('../controllers/Transaction')
const AuthMiddleware = require('../middleware/Auth')
const AuthController = require('../controllers/Auth')

Transaction.post('/login', AuthController.login)
Transaction.get('/', transactionController.read)
Transaction.post('/', AuthMiddleware.checkAuthToken, transactionController.create)
Transaction.patch('/:id', AuthMiddleware.checkAuthToken, transactionController.update)
Transaction.delete('/:id', AuthMiddleware.checkAuthToken, transactionController.delete)

module.exports = Transaction
