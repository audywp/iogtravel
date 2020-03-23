const AgenController = require('../controllers/Agen.js')
const Agen = require('express').Router()
const token = require('../middleware/Auth')
const RouterController = require('../controllers/Route')
// const AuthController = require('../controllers/Auth')

Agen.post('/', AgenController.create)
Agen.patch('/:id', AgenController.update)
Agen.delete('/:id', AgenController.delete)
Agen.post('/route', RouterController.create)

module.exports = Agen
