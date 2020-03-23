const Users = require('express').Router()
const multer = require('multer')
const AuthMiddleware = require('../middleware/Auth')
const AuthController = require('../controllers/Auth')
const UserDetail = require('../controllers/UserDetail')
const SchedulesController = require('../controllers/Schedules')
const storage = multer.diskStorage({
  destination: 'files/',
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})
const upload = multer({ storage })

const UserControllers = require('../controllers/Users')

Users.post('/login', AuthController.login)
// Users.post('/reservation', AuthMiddleware.checkAuthToken, SchedulesController.createSchedules)
Users.get('/', AuthMiddleware.checkAuthToken, UserControllers.read)
Users.get('/detail', UserDetail.read)
Users.patch('/update', UserDetail.update)
Users.patch('/:id', AuthMiddleware.checkAuthToken, upload.single('picture'), UserControllers.update)
Users.delete('/:id', AuthMiddleware.checkAuthToken, UserControllers.delete)

module.exports = Users
