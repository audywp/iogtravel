const AgenController = require('../controllers/Agen.js')
const Agen = require('express').Router()
const token = require('../middleware/Auth')
// const AuthController = require('../controllers/Auth')

Agen.get('/detail', AgenController.getUserDetail)
Agen.post('/', AgenController.create)
Agen.patch('/:id', AgenController.update)
Agen.delete('/:id', AgenController.delete)

module.exports = Agen
