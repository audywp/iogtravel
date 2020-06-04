const Admin = require('express').Router()
// const multer = require('multer')
const UserControl = require('../controllers/User')
const AdminControl = require('../controllers/Admin')
const TokenMid = require('../middleware/Auth')
const AuthControl = require('../controllers/Auth')
const UserdControl = require('../controllers/UserDetail')
const AgenControl = require('../controllers/Agent')
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
  limits: { fileSize: 4194304 },
  fileFilter: function (req, file, cb) {
    const extensions = path.extname(file.originalname)
    if (extensions !== '.png' && extensions !== '.jpg' && extensions !== '.jpeg') {
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

Admin.post('/create', AdminControl.createAdmin)
Admin.post('/login', AuthControl.login)

// get
Admin.get('/users', TokenMid.checkToken, UserControl.read)
Admin.get('/agent', AdminControl.readAgent)
Admin.get('/agent/userId', TokenMid.checkToken, AdminControl.getAgentByUser)
Admin.get('/bus', TokenMid.checkToken, AdminControl.readBus)
Admin.get('/user-detail', TokenMid.checkToken, AdminControl.readUserDetail)
Admin.get('/route', AdminControl.readRoutes)
Admin.get('/schedule', TokenMid.checkToken, AdminControl.readSchedules)
Admin.get('/schedule-by-admin', TokenMid.checkToken, AdminControl.getScheduleAdminMade)
Admin.get('/transaction', TokenMid.checkToken, AdminControl.readTransaction)
Admin.get('/detail', TokenMid.checkToken, UserdControl.getUserDetailByIdUser)
Admin.get('/route/end-by-start', TokenMid.checkToken, AdminControl.getEndRoute)

// create
Admin.post('/agent/add/', uploadImage, TokenMid.checkToken, AdminControl.createAgent)
Admin.post('/bus/add/', TokenMid.checkToken, AdminControl.createBusAdmin)
Admin.post('/route/add/:idUser', TokenMid.checkToken, AdminControl.createRoutes)
Admin.post('/schedule/add/:idRoute', TokenMid.checkToken, AdminControl.createSchedules)
// Admin.post('/schedule/add', )

// delete
Admin.delete('/route/delete/:idRoute', TokenMid.checkToken, AdminControl.deleteRoutes)
Admin.delete('/agent/delete/:idAgent', TokenMid.checkToken, AdminControl.deleteAgent)
Admin.delete('/bus/delete/:id', TokenMid.checkToken, AgenControl.deleteBuss)
Admin.delete('/schedule/delete/:idSchedule', TokenMid.checkToken, AdminControl.deleteSchedule)

// update
Admin.patch('/route/update/:idRoute', TokenMid.checkToken, AdminControl.updateRoutes)
Admin.patch('/agent/update', TokenMid.checkToken, AdminControl.updateAgent)
Admin.patch('/bus/update', TokenMid.checkToken, AgenControl.updateBusses)
Admin.patch('/schedule/update/:idSchedule', TokenMid.checkToken, AdminControl.updateScheduleByAdmin)

module.exports = Admin
