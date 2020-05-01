const User = require('express').Router()
const AuthController = require('../controllers/Auth')
const AuthToken = require('../middleware/Auth')
const AdminControl = require('../controllers/Admin')
const UserdControl = require('../controllers/UserDetail')
const UserControl = require('../controllers/User')
const AgentControl = require('../controllers/Agent')
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
  destination: 'files/',
  filename: function (req, file, callbck) {
    callbck(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

User.patch('/update', AuthToken.checkToken, UserControl.update)
User.post('/register', AuthController.register)

User.post('/login', AuthController.login)
User.post('/transaction/add', AuthToken.checkToken, UserControl.Transaction)
User.get('/detail', AuthToken.checkToken, UserdControl.getUserDetailByIdUser)
User.get('/schedule', UserControl.getScheduleForUser)
User.get('/transaction', AuthToken.checkToken, UserControl.getTransactionbyUser)
User.patch('/update', AuthToken.checkToken, UserdControl.updateUserDetail)
User.patch('/topup', AuthToken.checkToken, UserControl.topUp)
// User.post('/add-agent', AuthToken.checkToken, UserControl.createAgent)\
// test count
// User.get('/count-schedule', UserControl.countSchedule)
// User.get('/count-seat', UserControl.countSeat)

module.exports = User
