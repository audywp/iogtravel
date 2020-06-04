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
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})
const upload = multer({
  storage: storage,
  limits: { fileSize: 6194304 },
  fileFilter: function (req, file, cb) {
    const extensions = path.extname(file.originalname)
    if (extensions !== '.png' && extensions !== '.jpg' && extensions !== '.jpeg' && extensions !== '.JPG' && extensions !== '.JPEG') {
      return cb(new Error())
    } else {
      cb(null, true)
    }
  }
}).single('picture')

const uploadImage = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      const data = {
        upload: false,
        msg: 'File to Large'
      }
      console.log(err)
      res.send(data)
    } else if (err instanceof Error) {
      const data = {
        upload: false,
        msg: 'Only image are allowed'
      }
      res.send(data)
    } else {
      next()
    }
  })
}

User.patch('/update', AuthToken.checkToken, UserControl.update)


User.post('/register', AuthController.register)
User.post('/login', AuthController.login)
User.post('/transaction/add', AuthToken.checkToken, UserControl.Transaction)
User.post('/payment', AuthToken.checkToken, UserControl.PaymentMethod)
User.patch('/payment/:id', AuthToken.checkToken, UserControl.UpdatePayment)

User.get('/order/:id', AuthToken.checkToken, UserControl.GetPaymentMethodById)
User.get('/history', AuthToken.checkToken, UserControl.GetPaymentMethod)
User.get('/detail', AuthToken.checkToken, UserdControl.getUserDetailByIdUser)
User.get('/schedule', UserControl.getScheduleForUser)
User.post('/purchase', UserControl.getScheduleByName)
User.get('/transaction', AuthToken.checkToken, UserControl.getTransactionbyUser)
User.patch('/update/:id', uploadImage, AuthToken.checkToken, UserdControl.updateUserDetail)
User.patch('/topup', AuthToken.checkToken, UserControl.topUp)
// User.post('/add-agent', AuthToken.checkToken, UserControl.createAgent)\
// test count
// User.get('/count-schedule', UserControl.countSchedule)
// User.get('/count-seat', UserControl.countSeat)

module.exports = User
